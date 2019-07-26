import { injectable, inject } from 'inversify';
import { ServiceTypes } from './types';
import ArgumentParser from './arguments/ArgumentParser';
import { IBotCommand } from './BotCommand';
import { Message } from 'discord.js';
import CommandContext from './CommandContext';
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

  public create (message: Message, commandStr: string, args: string[]): CommandContext {
    return new CommandContext(message, commandStr, args)
  }

  public inject (ctx: CommandContext, command: IBotCommand): void {
    ctx.command = command
    const signature = ctx.command.parsedSignature
    const parsedArgs = this.parseSignatureForArguments(signature, ctx.args)
    ctx.setParsedArguments(parsedArgs)
  }
}

export default CommandContextFactory
