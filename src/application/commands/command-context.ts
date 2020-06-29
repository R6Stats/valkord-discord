import { Message, MessageEmbed } from 'discord.js'
import { ParsedCommandSignature } from './parsed-command-signature'

export class MiddlewareContext {
  public readonly original: Message
  public readonly command: string
  public readonly args: string[]

  public constructor (original: Message, command: string, args: string[]) {
    this.original = original
    this.command = command
    this.args = args
  }

  public async reply (message: Message | MessageEmbed | string): Promise<Message> {
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
