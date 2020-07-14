import { CommandSignatureArgumentType, CommandSignatureArgumentValue, CommandSignatureArgument } from '../../../../src/application/commands'

export enum Animal {
  Cat,
  Dog,
  Bird,
}

export class CommandSignatureArgumentTypeAnimal extends CommandSignatureArgumentType {
  protected readonly key: string = 'animal'

  public parse (index: number, args: string[], arg: CommandSignatureArgument): CommandSignatureArgumentValue | null {
    const input = args[index].toLowerCase()
    const animal = this.resolveAnimal(input)

    return new CommandSignatureArgumentValue(animal, 1, arg)
  }

  private resolveAnimal = (input: string): Animal | null => {
    return this.animalMap.find(map => map.aliases.some(a => a === input))?.type
  }

  get animalMap (): { type: Animal, aliases: string[] }[] {
    return [
      {
        type: Animal.Cat, aliases: ['cat']
      },
      {
        type: Animal.Dog, aliases: ['dog'],
      },
      {
        type: Animal.Bird, aliases: ['bird', 'parrot'],
      }
    ]
  }
}
