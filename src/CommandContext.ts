'use strict'

import { Message } from 'discord.js'
import { IBotCommand } from './BotCommand'
import GenericArgument from './arguments/GenericArgument'

interface ICommandContext {
  message: Message
  commandStr: string
  args: string[]
  command: IBotCommand
  parsed: Map<string, GenericArgument<any>>|null

  setParsedArguments (parsed: Map<string, GenericArgument<any>>): void

  shouldAttemptParsing (): boolean

  reply (msg: string | object): Promise<Message | Message[]>
}

class CommandContext implements ICommandContext {
  message: Message
  commandStr: string
  args: string[]
  command: IBotCommand
  parsed: Map<string, GenericArgument<any>>|null

  constructor (message: Message, commandStr: string, args: string[], command?: IBotCommand, parsed?: Map<string, GenericArgument<any>>) {
    this.message = message
    this.commandStr = commandStr
    this.args = args
    this.command = command
    this.parsed = parsed
  }

  public setParsedArguments (parsed: Map<string, GenericArgument<any>>): void {
    this.parsed = parsed
  }

  public shouldAttemptParsing (): boolean {
    return !!this.command.signature
  }

  public reply (msg: string | object): Promise<Message | Message[]> {
    return this.message.channel.send(msg)
  }
}

export default CommandContext
