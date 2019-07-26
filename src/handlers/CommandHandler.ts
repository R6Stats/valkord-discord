'use strict'

import container from '../../inversify.config'
import { injectable, inject } from 'inversify'
import { ServiceTypes } from '../types'

import { Client, Message, TextChannel } from 'discord.js'

import CommandRegistrar from '../CommandRegistrar'
import { IBotCommand } from '../BotCommand'
import CommandContext from '../CommandContext'
import { EventHandler } from './EventHandler'

import BotCommandException from '../exceptions/BotCommandException'
import CommandContextFactory from '../CommandContextFactory';

const SUPPORTED_RESPONDERS = ['!r6s', '!r6stats', '!r6', 'r6s', 'r6stats', 'r6']

@injectable()
class CommandHandler extends EventHandler {
  private cmdFactory: CommandContextFactory;
  private client: Client;

  constructor (
    @inject(ServiceTypes.DiscordClient) client: Client,
    @inject(ServiceTypes.CommandContextFactory) cmdFactory: CommandContextFactory
  ) {
    super()

    this.client = client
    this.cmdFactory = cmdFactory
  }

  public setup (): void {
    this.client.on('message', (message: Message) => this.handleMessage(message))
  }

  private handleMessage (message: Message) {
    if (message.author.bot) return
    if (!this.isOwnCommand(message.content)) return

    const split = message.content.split(' ')
    if (split.length <= 1) return
    const command = split[1].toLowerCase()
    const args = split.slice(2)
    const commands = container.getAll<IBotCommand>(ServiceTypes.Command)
    const ctx = new CommandContext(message, command, args)

    for (const cmd of commands) {
      if (cmd.shouldInvoke(ctx)) {
        this.invokeCommand(cmd, ctx)
        break
      }
    }
  }

  private async invokeCommand (cmd: IBotCommand, ctx: CommandContext) {
    const channel = ctx.message.channel
    const name = channel instanceof TextChannel ? `in #${channel.name}` : 'via DM'
    console.log(`Invoking command ${ cmd } ${name} with args ${ctx.args.join(',')}`)
    try {
      cmd.invoke(ctx)
    } catch (err) {
      if (err instanceof BotCommandException) {
        const cmdException = err as BotCommandException;
        cmdException.render(ctx)
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

  public getResponders (): string[] {
    return SUPPORTED_RESPONDERS
  }
}

export default CommandHandler
