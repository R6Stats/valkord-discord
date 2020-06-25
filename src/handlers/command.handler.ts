import { Injectable } from '../decorators/injectable.decorator'
import { Message } from 'discord.js'
import { CopperClient } from '../client'
import { Container } from '../container'
import { Handler } from './handler'
import { Command, CommandContext } from '../commands/command'
import { Constructor } from '../types'
import { ConfigService } from '../services/config/config.service'

@Injectable()
export class CommandHandler extends Handler {
  private readonly container: Container
  private readonly config: ConfigService

  private readonly commands: Set<Command> = new Set()

  public constructor (container: Container, config: ConfigService) {
    super()

    this.container = container
    this.config = config
  }

  public registerCommand (cmd: Constructor<Command>): void {
    this.commands.add(this.container.resolve(cmd))
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

    const commands = Array.from(this.commands)
    const ctx = new CommandContext(message, cmd.toLowerCase(), args)

    for (const command of commands) {
      if (command.shouldHandle(ctx)) {
        command.handle(ctx)
      }
    }
  }
}
