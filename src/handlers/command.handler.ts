import { Message, Client } from 'discord.js'
import { Injectable } from '../application/container'
import { CommandContext, CommandRegistrar, CommandSignatureParser, MiddlewareContext } from '../application/commands'
import { ClientException } from '../exceptions/client.exception'
import { Logger } from '../utils/logger'
import { Handler } from './handler'
import { DefaultValkordConfig } from '../application/config'

@Injectable()
export class CommandHandler extends Handler {
  private readonly client: Client
  private readonly config: DefaultValkordConfig
  private readonly commands: CommandRegistrar
  private readonly parser: CommandSignatureParser

  private readonly logger = new Logger(CommandHandler.name)

  public constructor (client: Client, config: DefaultValkordConfig, commands: CommandRegistrar, parser: CommandSignatureParser) {
    super()

    this.client = client
    this.config = config
    this.commands = commands
    this.parser = parser
  }

  public setup (): void {
    this.client.on('message', (message: Message) => this.handleMessage(message))
  }

  public handleMessage (message: Message): void {
    const [prefix, cmd, ...args] = message.content.split(' ')
    const user = this.client.user

    if (user.id === message.author.id) return

    const configPrefixes = this.config.get('prefixes')
    const userPrefixes = [`<@!${user.id}>`, `<@${user.id}>`]

    const allPrefixes = [...configPrefixes, ...userPrefixes]

    if (!allPrefixes.includes(prefix.toLowerCase())) return

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
            this.logger.log(e)
          }
        }
      }
    }
  }
}
