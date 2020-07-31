import { Message, MessageOptions, StringResolvable, MessageEmbed } from 'discord.js'
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

  public async reply (message: MessageOptions | StringResolvable | MessageEmbed): Promise<Message> {
    if ((this.message.guild && !this.message.guild.me.permissionsIn(this.message.channel).has('SEND_MESSAGES')) || !this.message.guild) {
      if (message.constructor.name === 'MessageEmbed') {
        return this.message.author.send({ embed: message })
      }

      return this.message.author.send(message)
    } else if (message.constructor.name === 'MessageEmbed') {
      return this.message.channel.send({ embed: message, content: `<@${this.message.author.id}>,` })
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
