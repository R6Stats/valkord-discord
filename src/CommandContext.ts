'use strict'

import { Message } from 'discord.js'
import { IBotCommand } from './BotCommand';
import GenericArgument from './arguments/GenericArgument';

class CommandContext {
  message: Message
  command: IBotCommand
  args: string[]
  parsed: Map<string, GenericArgument<any>>|null

  constructor (message: Message, command: IBotCommand, args: string[], parsed: Map<string, GenericArgument<any>> = null) {
    this.message = message
    this.command = command
    this.args = args
    this.parsed = parsed
  }

  public reply (msg: string | object) {
    return this.message.channel.send(msg)
  }
}

export default CommandContext
