import { Message } from 'discord.js'
import { Injectable } from '../../../src/application/container'
import { ValkordCommand, CommandContext, CommandSignatureArgumentValue } from '../../../src/application/commands'
import { Animal } from './argument-types/animal.argument-type'

export interface AnimalCommandArguments {
  animal: CommandSignatureArgumentValue<Animal | null>
}

@Injectable()
export class AnimalCommand extends ValkordCommand {
  public readonly command = 'animal'
  public readonly name = 'Animal'
  public readonly group = 'Other'
  public readonly shortHelp = 'r6s animal <animal:animal>'
  public readonly signature = '<animal:animal>'

  public async handle (ctx: CommandContext): Promise<Message | Message[] | void> {
    const { animal: { value: animal } } = ctx.signature.get<AnimalCommandArguments>()

    return ctx.reply(`Selected animal: ${animal}`)
  }
}
