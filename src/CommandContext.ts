'use strict'

import { Message } from 'discord.js'
import { IBotCommand } from './BotCommand'
import GenericArgument from './arguments/GenericArgument'
interface IMessageContext {
  message: Message
  commandStr: string
  args: string[]

  reply (msg: string | object): Promise<Message | Message[]>
}

interface ICommandContext extends IMessageContext {
  command: IBotCommand
  parsed: Map<string, GenericArgument<any>>|null

  getArguments (arr: string[])
}

class MessageContext {
  public readonly message: Message
  public readonly commandStr: string
  public readonly args: string[]

  constructor (message: Message, commandStr: string, args: string[], command?: IBotCommand, parsed?: Map<string, GenericArgument<any>>) {
    this.message = message
    this.commandStr = commandStr
    this.args = args
  }

  public reply (msg: string | object): Promise<Message | Message[]> {
    return this.message.channel.send(msg)
  }
}

class CommandContext extends MessageContext implements ICommandContext {
  public readonly command: IBotCommand
  public readonly parsed: Map<string, GenericArgument<any>>|null

  constructor (message: Message, commandStr: string, args: string[], command?: IBotCommand, parsed?: Map<string, GenericArgument<any>>) {
    super(message, commandStr, args)
    this.command = command
    this.parsed = parsed
  }

  getArguments (arr: string[]) {
    const ret = {}
    arr.forEach(arg => ret[arg] = this.parsed.get(arg))

    return ret
  }
}

export { IMessageContext, MessageContext, ICommandContext, CommandContext }
