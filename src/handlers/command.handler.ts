import { Message } from 'discord.js'
import { CopperClient } from '../client'
import { CommandContext, CommandRegistrar, CommandSignatureParser, MiddlewareContext } from '../commands/command'
import { Container } from '../container'
import { Injectable } from '../decorators/injectable.decorator'
import { ConfigService } from '../services/config/config.service'
import { Handler } from './handler'

@Injectable()
export class CommandHandler extends Handler {
  private readonly container: Container
  private readonly config: ConfigService

  private readonly commands: CommandRegistrar
  private readonly parser: CommandSignatureParser

  public constructor (container: Container, config: ConfigService, commands: CommandRegistrar, parser: CommandSignatureParser) {
    super()

    this.container = container
    this.config = config
    this.commands = commands
    this.parser = parser
  }

  public setup (): void {
    const client = this.container.resolve<CopperClient>(CopperClient).getClient()

    client.on('message', (message: Message) => this.handleMessage(message))
  }

  public handleMessage (message: Message): void {
    const [prefix, cmd, ...args] = message.content.split(' ')
    const prefixes = this.config.get<string[]>('prefixes')

    if (!prefixes.includes(prefix)) return

    if (!cmd) return

    const commands = this.commands.getCommands()

    const midCtx = new MiddlewareContext(message, cmd.toLowerCase(), args)

    for (const command of commands) {
      if (command.shouldHandle(midCtx)) {
        const parsed = this.parser.parse(command.getSignature(), args)
        const ctx = new CommandContext(message, cmd.toLowerCase(), args, parsed)

        command.handle(ctx)
      }
    }
  }
}
