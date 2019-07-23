import container from '../inversify.config'
import { ServiceTypes } from './types'

import * as fs from 'fs'
import * as path from 'path'

import { Client, Message, TextChannel } from 'discord.js'

import BaseCommand from './BaseCommand'
import MessageContext from './MessageContext'

import BotConfig from './BotConfig'

import ConfigProvider from './providers/ConfigProvider'
import R6StatsAPIProvider from './providers/R6StatsAPIProvider'
import BotCommandException from './exceptions/BotCommandException';

const SUPPORTED_RESPONDERS = ['!r6s', '!r6stats', '!r6', 'r6s', 'r6stats', 'r6']

const commands = []

class R6StatsBot {
  client: Client
  commands: Array<BaseCommand>

  constructor () {
    this.client = new Client()
    this.setupHandlers()
    this.registerProviders()
    this.loadCommands()
    this.login()
  }

  setupHandlers () {
    const client = this.client

    client.on('ready', () => this.handleReady())
    client.on('error', (err) => this.handleError(err))
    client.on('message', (message: Message) => this.handleMessage(message))
  }

  registerProviders () {
    const PROVIDERS = [
      ConfigProvider,
      R6StatsAPIProvider
    ]


    PROVIDERS.forEach(ProviderClass => {
      const instance = new ProviderClass()
      instance.boot()
      instance.register()
    })
  }

  login () {
    const config = container.get<BotConfig>(ServiceTypes.Config)
    this.client.login(config.discordToken)
  }

  async loadCommands () {
    const files = fs.readdirSync(path.join(__dirname, 'commands'))

    for (const file of files) {
      const { default: clazz } = await import(path.join(__dirname, 'commands', file))
      container.bind<BaseCommand>(clazz).toSelf()

      console.log(`Registering command ${ clazz.name }...`)
      commands.push(clazz)
    }
    console.log(`${ commands.length } command${ commands.length === 1 ? '': 's' } registered.`)
  }

  isOwnCommand (str: string) {
    const split = str.split(' ')
    if (split.length === 0) return false
    const cmd = split[0].toLowerCase()
    for (const responder of SUPPORTED_RESPONDERS) {
      if (cmd === responder) {
        return true
      }
    }
  }

  handleReady () {
    if (this.client.shard) {
      console.log(`Shard ${this.client.shard.id} online and ready to handle ${this.client.guilds.size} guilds!`)
    } else {
      console.log('Bot connected!')
    }
  }

  handleError (e) {
    console.log(e)
  }

  handleMessage (message: Message) {

    if (message.author.bot) return

    if (!this.isOwnCommand(message.content)) return

    let split = message.content.split(' ')
    if (split.length <= 1) return
    let command = split[1].toLowerCase()
    let args = split.slice(2)

    for (let cmd of commands) {
      const cmdInstance = container.get<BaseCommand>(cmd)

      const ctx = new MessageContext(message, command, args)

      if (cmdInstance.shouldInvoke(ctx)) {
        const channel = message.channel
        const name = channel instanceof TextChannel ? `in #${channel.name}` : 'via DM'
        console.log(`Invoking command ${ command } ${name} with args ${args.join(',')}`)
        cmdInstance.invoke(ctx)
          .catch((err: Error) => {
            if (err instanceof BotCommandException) {
              const cmdException = err as BotCommandException;
              cmdException.render(ctx)
            }
          })
        break
      }
    }
  }
}

export default new R6StatsBot()
