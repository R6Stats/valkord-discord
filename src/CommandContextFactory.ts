import { injectable, inject } from 'inversify';
import { ServiceTypes } from './types';
import ArgumentParser from './arguments/ArgumentParser';
import { IBotCommand } from './BotCommand';
import { Message } from 'discord.js';
import CommandContext from './CommandContext';
import GenericArgument from './arguments/GenericArgument';

@injectable()
class CommandContextFactory {
  private parser: ArgumentParser

  constructor (
    @inject(ServiceTypes.ArgumentParser) parser: ArgumentParser
  ) {
    this.parser = parser
  }

  public create (message: Message, command: IBotCommand, args: string[]) {
    const signature = command.parsedSignature
    let parsed: Map<string, GenericArgument<any>>|null

    if (signature) {
      parsed = this.parser.parse(signature, args)
    }

    return new CommandContext(message, command, args, parsed)
  }
}

export default CommandContextFactory
