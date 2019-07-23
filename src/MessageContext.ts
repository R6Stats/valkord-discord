'use strict'

import { Message } from 'discord.js';

class MessageContext {
  message: Message
  command: string
  args: string[]

  constructor (message: Message, command: string, args: string[]) {
    this.message = message
    this.command = command
    this.args = args
  }

  reply (msg: string | object) {
    return this.message.channel.send(msg)
  }
}

export default MessageContext
