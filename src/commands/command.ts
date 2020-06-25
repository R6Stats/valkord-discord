import { Message } from 'discord.js'
import { Injectable } from '../decorators/injectable.decorator'
import { InvalidArgumentException } from '../exceptions/invalid-argument.exception'
import { MissingArgumentException } from '../exceptions/missing-argument.exception'
import { Container, OnModuleBoot } from '../container'
import { Constructor } from '../types'

export abstract class Command {
  public command: string = ''
  public aliases: string[] = []
  public signature: string | undefined
  public parsed: CommandSignature

  protected ready: boolean = false

  public getAliases (): string[] {
    return this.aliases
  }

  public getCommand (): string {
    return this.command
  }

  public hasCommand (input: string): boolean {
    return this.command === input || this.aliases.some(a => a === input)
  }

  public getRawSignature (): string | undefined {
    return this.signature
  }

  public getSignature (): CommandSignature {
    return this.parsed
  }

  public shouldHandle (ctx: MiddlewareContext): boolean {
    return this.command === ctx.command
  }

  public setReady (state: boolean): void {
    this.ready = state
  }

  public isReady (): boolean {
    return this.ready
  }

  abstract handle (ctx: CommandContext): Promise<void | Message | Message[]>
}

@Injectable()
export class CommandRegistrar implements OnModuleBoot {
  private readonly container: Container

  private readonly commands: Command[]
  private readonly arguments: CommandSignatureArgumentType[]

  private booted: boolean = false

  public constructor (container: Container) {
    this.container = container

    this.commands = []
    this.arguments = []
  }

  public registerCommand (command: Constructor<Command>): void {
    const instance = this.container.resolve<Command>(command)
    this.commands.push(instance)

    console.log(`[CommandRegistrar] Registered command ${command.name}`)

    if (this.booted) {
      this.setupCommand(instance)
    }
  }

  public getCommands (): Command[] {
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

  public setupCommand (command: Command): void {
    const parser = this.container.resolve<CommandSignatureFactory>(CommandSignatureFactory)
    command.parsed = parser.parse(command.signature)

    command.setReady(true)
  }

  public boot (): void {
    this.setupCommands()
  }
}

@Injectable()
export class CommandSignatureParser {
  public parse (signature: CommandSignature, args: string[]): ParsedCommandSignature {
    const signatureArgs = signature.getArguments()
    const parsed = []

    let index = 0
    for (const arg of signatureArgs) {
      const type = arg.getType()
      const value = type.parse(index, args, arg)

      if (!value && !arg.isOptional()) {
        throw new MissingArgumentException(arg.getKey())
      }

      index += value.getLength()
      parsed.push(value)
    }

    return new ParsedCommandSignature(parsed)
  }
}

export interface CommandArguments {
  [key: string]: CommandSignatureArgumentValue
}

export class ParsedCommandSignature {
  private readonly values: CommandSignatureArgumentValue[]

  public constructor (values: CommandSignatureArgumentValue[]) {
    this.values = values


  }

  public getValues (): CommandSignatureArgumentValue[] {
    return this.values
  }

  public get (): CommandArguments {
    return this.values.reduce((carry, val) => {
      carry[val.getArgument().getKey()] = val

      return carry
    }, {})
  }
}

@Injectable()
export class CommandSignatureFactory {
  private readonly registrar: CommandRegistrar

  private static OPTIONAL_ARGUMENT_TOKEN = '{'

  public constructor (registrar: CommandRegistrar) {
    this.registrar = registrar
  }

  public parse (signature: string): CommandSignature {
    const parsed = []

    const args = signature.split(' ')

    for (const arg of args) {
      const optional = arg.startsWith(CommandSignatureFactory.OPTIONAL_ARGUMENT_TOKEN)
      const identifier = arg.substr(1, arg.length - 2)
      const [key, type] = identifier.split(':')
      const resolvedType = this.registrar.resolveArgumentForKey(type)

      if (!resolvedType) {
        throw new InvalidArgumentException(type)
      }

      const argument = new CommandSignatureArgument(resolvedType, key, optional)

      parsed.push(argument)
    }

    return new CommandSignature(parsed)
  }
}

export class CommandSignature {
  private readonly args: CommandSignatureArgument[]

  public constructor (args: CommandSignatureArgument[]) {
    this.args = args
  }

  public getArguments (): CommandSignatureArgument[] {
    return this.args
  }
}

export abstract class CommandSignatureArgumentType {
  protected readonly key: string

  abstract parse (index: number, args: string[], arg: CommandSignatureArgument): CommandSignatureArgumentValue | null

  public getKey (): string {
    return this.key
  }
}

export class CommandSignatureArgumentTypeString extends CommandSignatureArgumentType {
  protected readonly key: string = 'string'

  public parse (index: number, args: string[], arg: CommandSignatureArgument): CommandSignatureArgumentValue | null {
    return new CommandSignatureArgumentValue(args[index], 1, arg)
  }
}

export class CommandSignatureArgument<T extends CommandSignatureArgumentType = CommandSignatureArgumentType> {
  private readonly type: T
  private readonly key: string
  private readonly optional: boolean

  public constructor (type: T, key: string, optional: boolean) {
    this.type = type
    this.key = key
    this.optional = optional
  }

  public getType (): T {
    return this.type
  }

  public getKey (): string {
    return this.key
  }

  public isOptional (): boolean {
    return this.optional
  }
}

export class CommandSignatureArgumentValue {
  private readonly value: any
  private readonly length: number
  private readonly arg: CommandSignatureArgument

  public constructor (value: any, length: number, arg: CommandSignatureArgument) {
    this.value = value
    this.length = length
    this.arg = arg
  }

  public getValue (): any {
    return this.value
  }

  public getLength (): number {
    return this.length
  }

  public getArgument (): CommandSignatureArgument {
    return this.arg
  }
}

export class MiddlewareContext {
  public readonly original: Message
  public readonly command: string
  public readonly args: string[]

  public constructor (original: Message, command: string, args: string[]) {
    this.original = original
    this.command = command
    this.args = args
  }

  public async reply (message: Message | string): Promise<Message> {
    return this.original.reply(message)
  }
}

export class CommandContext extends MiddlewareContext {
  public readonly signature: ParsedCommandSignature

  public constructor (original: Message, command: string, args: string[], signature: ParsedCommandSignature) {
    super(original, command, args)

    this.signature = signature
  }
}
