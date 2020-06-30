import { Message } from 'discord.js'
import { ConfigService } from '../application/config/config.service'
import { Injectable } from '../application/container'
import { Container } from '../application/container/container'
import { ValkClient } from '../client'
import { CommandContext, CommandRegistrar, CommandSignatureParser, MiddlewareContext } from '../application/commands'
import { ClientException } from '../exceptions/client.exception'
import { Logger } from '../utils/logger'
import { Handler } from './handler'

@Injectable()
export class CommandHandler extends Handler {
  private readonly container: Container
  private readonly config: ConfigService
  private readonly commands: CommandRegistrar
  private readonly parser: CommandSignatureParser

  private readonly logger = new Logger(CommandHandler.name)

  public constructor (container: Container, config: ConfigService, commands: CommandRegistrar, parser: CommandSignatureParser) {
    super()

    this.container = container
    this.config = config
    this.commands = commands
    this.parser = parser
  }

  public setup (): void {
    const client = this.container.resolve<ValkClient>(ValkClient).getClient()

    client.on('message', (message: Message) => this.handleMessage(message))
  }

  public handleMessage (message: Message): void {
    const client = this.container.resolve<ValkClient>(ValkClient).getClient()
    const [prefix, cmd, ...args] = message.content.split(' ')
    const user = client.user

    if (user.id === message.author.id) return

    const configPrefixes = this.config.get<string[]>('prefixes')
    const userPrefixes = [`<@!${user.id}>`, `<@${user.id}>`]

    const allPrefixes = [...configPrefixes, ...userPrefixes]

    if (!allPrefixes.includes(prefix)) return

    if (!cmd) return

    const commands = this.commands.getCommands()

    const midCtx = new MiddlewareContext(message, cmd.toLowerCase(), args)

    for (const command of commands) {
      if (command.shouldHandle(midCtx)) {
        try {
          const parsed = this.parser.parse(command.parsed, args)
          const ctx = new CommandContext(message, cmd.toLowerCase(), args, parsed)

          command.handle(ctx)
        } catch (e) {
          if (e instanceof ClientException) {
            command.handleException(midCtx, e)
          } else {
            this.logger.log(`An error occurred while processing a command: ${e.message}`)
          }
        }
      }
    }
  }
}
