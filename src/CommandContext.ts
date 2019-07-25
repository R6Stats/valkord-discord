'use strict'

import { Message } from 'discord.js'

class CommandContext {
  message: Message
  command: string
  args: string[]

  constructor (message: Message, command: string, args: string[]) {
    this.message = message
    this.command = command
    this.args = args
  }

  public reply (msg: string | object) {
    return this.message.channel.send(msg)
  }
}

export default CommandContext
