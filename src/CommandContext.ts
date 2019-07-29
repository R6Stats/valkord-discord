import { Message } from 'discord.js'
import { IBotCommand } from './BotCommand'
import GenericArgument from './arguments/GenericArgument'

interface ParsedArguments { [key: string]: GenericArgument<any> }

interface IMessageContext {
  message: Message;
  commandStr: string;
  args: string[];

  reply (msg: string | object): Promise<Message | Message[]>;
}

interface ICommandContext extends IMessageContext {
  command: IBotCommand;
  parsed: ParsedArguments;

  getArguments <T = {}>(): T;
}

class MessageContext {
  public readonly message: Message
  public readonly commandStr: string
  public readonly args: string[]

  public constructor (message: Message, commandStr: string, args: string[]) {
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
  public readonly parsed: ParsedArguments;

  public constructor (message: Message, commandStr: string, args: string[], command: IBotCommand, parsed: ParsedArguments) {
    super(message, commandStr, args)

    this.command = command
    this.parsed = parsed || {}
  }

  public getArguments <T extends {}>(): T {
    return this.parsed as T
  }
}

export { IMessageContext, MessageContext, ICommandContext, CommandContext, ParsedArguments }
