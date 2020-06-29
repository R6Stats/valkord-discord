import { Injectable } from '../container'
import { Container, OnModuleBoot } from '../container/container'
import { Constructor } from '../../types'
import { Logger } from '../../utils/logger'
import { ClientCommand, CommandSignatureFactory } from '.'
import { CommandSignatureArgumentType } from './command-signature-argument-type'

@Injectable()
export class CommandRegistrar implements OnModuleBoot {
  private readonly container: Container

  private readonly commands: ClientCommand[]
  private readonly arguments: CommandSignatureArgumentType[]

  private booted: boolean = false

  private readonly logger = new Logger(CommandRegistrar.name)

  public constructor (container: Container) {
    this.container = container

    this.commands = []
    this.arguments = []
  }

  public registerCommand (command: Constructor<ClientCommand>): void {
    const instance = this.container.resolve<ClientCommand>(command)
    this.commands.push(instance)

    this.logger.log(`Registered command ${command.name}`)

    if (this.booted) {
      this.setupCommand(instance)
    }
  }

  public getCommands (): ClientCommand[] {
    return this.commands
  }

  public registerArgumentType (type: Constructor<CommandSignatureArgumentType>): void {
    const instance = new (type)

    this.arguments.push(instance)
  }

  public getArgumentTypes (): CommandSignatureArgumentType[] {
    return this.arguments
  }

  public resolveArgumentForKey (key: string): CommandSignatureArgumentType | null {
    return this.arguments.find(a => a.getKey() === key)
  }

  public setupCommands (): void {
    for (const command of this.commands) {
      if (command.isReady()) continue

      this.setupCommand(command)
    }

    this.booted = true
  }

  public setupCommand (command: ClientCommand): void {
    const parser = this.container.resolve<CommandSignatureFactory>(CommandSignatureFactory)
    command.parsed = parser.parse(command.signature)

    command.setReady(true)
  }

  public boot (): void {
    this.setupCommands()
  }
}
