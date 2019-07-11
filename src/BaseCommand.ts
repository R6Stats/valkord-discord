import { Message } from "discord.js";

abstract class BaseCommand {
  protected message: Message
  protected args: Array<string>
  protected command: string

  constructor (command: string, args: Array<string>, message: Message) {
    this.message = message
    this.args = args
    this.command = command
  }

  reply (msg: string | object) {
    return this.message.channel.send(msg)
  }

  abstract shouldInvoke(): boolean;
  abstract invoke(): void;
}

export default BaseCommand
