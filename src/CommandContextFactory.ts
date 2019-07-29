import { injectable, inject } from 'inversify';
import { ServiceTypes } from './types';
import ArgumentParser from './arguments/ArgumentParser';
import { IBotCommand } from './BotCommand';
import { Message } from 'discord.js';
import { MessageContext, CommandContext } from './CommandContext';
import GenericArgument from './arguments/GenericArgument';
import { CommandSignature } from './arguments/CommandSignature';

@injectable()
class CommandContextFactory {
  private parser: ArgumentParser

  constructor (
    @inject(ServiceTypes.ArgumentParser) parser: ArgumentParser
  ) {
    this.parser = parser
  }

  private parseSignatureForArguments (signature: CommandSignature, args: string[]): Map<string, GenericArgument<any>>|null {
    if (signature) return this.parser.parse(signature, args)
    return null
  }

  public create (message: Message, commandStr: string, args: string[]): MessageContext {
    return new MessageContext(message, commandStr, args)
  }

  public fromMessageContext (ctx: MessageContext, command: IBotCommand): CommandContext {
    const parsedArgs = this.parseSignatureForArguments(command.parsedSignature, ctx.args)

    return new CommandContext(ctx.message, ctx.commandStr, ctx.args, command, parsedArgs)
  }
}

export default CommandContextFactory
