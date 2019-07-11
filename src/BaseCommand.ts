import { Message } from "discord.js";

abstract class BaseCommand {
  protected message: Message
  protected args: Array<string>
  protected command: string

  hydrate (command: string, args: Array<string>, message: Message): BaseCommand {
    this.message = message
    this.args = args
    this.command = command

    return this
  }

  reply (msg: string | object) {
    return this.message.channel.send(msg)
  }

  abstract shouldInvoke(): boolean;
  abstract invoke(): void;
}

export default BaseCommand
