import { Message, MessageEmbed } from 'discord.js'
import { ParsedCommandSignature } from './parsed-command-signature'

export class MiddlewareContext {
  public readonly message: Message
  public readonly command: string
  public readonly args: string[]

  public constructor (original: Message, command: string, args: string[]) {
    this.message = original
    this.command = command
    this.args = args
  }

  public async reply (message: Message | MessageEmbed | string): Promise<Message> {
    if (this.message.guild && !this.message.guild.me.permissionsIn(this.message.channel).has('SEND_MESSAGES')) {
      return this.message.author.send(message)
    }

    return this.message.reply(message)
  }
}

export class CommandContext extends MiddlewareContext {
  public readonly signature: ParsedCommandSignature

  public constructor (original: Message, command: string, args: string[], signature: ParsedCommandSignature) {
    super(original, command, args)

    this.signature = signature
  }
}
