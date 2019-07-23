'use strict'

import container from '../../inversify.config'
import { injectable, inject } from 'inversify'
import { ServiceTypes } from '../types'

import { Client, Message, TextChannel } from 'discord.js'

import CommandRegistrar from '../CommandRegistrar'
import BaseCommand from '../BaseCommand'
import MessageContext from '../MessageContext'
import EventHandler from './EventHandler'

import BotCommandException from '../exceptions/BotCommandException'

const SUPPORTED_RESPONDERS = ['!r6s', '!r6stats', '!r6', 'r6s', 'r6stats', 'r6']

@injectable()
class CommandHandler implements EventHandler {
  private registrar: CommandRegistrar;
  private client: Client;

  constructor (
    @inject(ServiceTypes.DiscordClient) client: Client,
    @inject(ServiceTypes.CommandRegistrar) registrar: CommandRegistrar
  ) {
    this.client = client
    this.registrar = registrar
  }

  public setup (): void {
    this.client.on('message', (message: Message) => this.handleMessage(message))
  }

  private handleMessage (message: Message) {

    if (message.author.bot) return

    if (!this.isOwnCommand(message.content)) return

    let split = message.content.split(' ')
    if (split.length <= 1) return
    let command = split[1].toLowerCase()
    let args = split.slice(2)

    const commands = this.registrar.getCommands()

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

  private isOwnCommand (str: string) {
    const split = str.split(' ')
    if (split.length === 0) return false
    const cmd = split[0].toLowerCase()
    for (const responder of SUPPORTED_RESPONDERS) {
      if (cmd === responder) {
        return true
      }
    }
  }
}

export default CommandHandler
