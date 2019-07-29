import { Client, Message, TextChannel } from 'discord.js'
import { inject, injectable } from 'inversify'
import container from '../../inversify.config'
import { IBotCommand } from '../BotCommand'
import { IMessageContext } from '../CommandContext'
import ContextFactory from '../ContextFactory'
import BotCommandException from '../exceptions/BotCommandException'
import { ServiceTypes } from '../types'
import { EventHandler } from './EventHandler'

const SUPPORTED_RESPONDERS = ['!r6s', '!r6stats', '!r6', 'r6s', 'r6stats', 'r6']

@injectable()
class CommandHandler extends EventHandler {
  private ctxFactory: ContextFactory;
  private client: Client;

  public constructor (
    @inject(ServiceTypes.DiscordClient) client: Client,
    @inject(ServiceTypes.CommandContextFactory) ctxFactory: ContextFactory
  ) {
    super()

    this.client = client
    this.ctxFactory = ctxFactory
  }

  public setup (): void {
    this.client.on('message', (message: Message): Promise<void> => this.handleMessage(message))
  }

  private handleMessage (message: Message): Promise<void> {
    if (message.author.bot) return
    if (!this.isOwnCommand(message.content)) return

    const split = message.content.split(' ')
    if (split.length <= 1) return
    const command = split[1].toLowerCase()
    const args = split.slice(2)
    const commands = container.getAll<IBotCommand>(ServiceTypes.Command)
    const ctx = this.ctxFactory.create(message, command, args)

    for (const cmd of commands) {
      if (cmd.shouldInvoke(ctx)) {
        this.invokeCommand(cmd, ctx)
        break
      }
    }
  }

  private async invokeCommand (cmd: IBotCommand, msgCtx: IMessageContext): Promise<void> {
    const channel = msgCtx.message.channel
    const source = channel instanceof TextChannel ? `in #${channel.name}` : 'via DM'
    console.log(`Invoking command ${ cmd.name } ${source} with args ${msgCtx.args.join(',')}`)
    try {
      const cmdCtx = this.ctxFactory.fromMessageContext(msgCtx, cmd)
      cmd.invoke(cmdCtx)
    } catch (err) {
      if (err instanceof BotCommandException) {
        const cmdException = err as BotCommandException
        cmdException.render(msgCtx)
      }
    }
  }

  private isOwnCommand (str: string): boolean {
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
