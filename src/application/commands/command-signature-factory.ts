import { Injectable } from '../container'
import { InvalidArgumentException } from '../../exceptions/invalid-argument.exception'
import { CommandRegistrar } from './command-registrar'
import { CommandSignature } from './command-signature'
import { CommandSignatureArgument } from './command-signature-argument'

@Injectable()
export class CommandSignatureFactory {
  private readonly registrar: CommandRegistrar

  private static OPTIONAL_ARGUMENT_TOKEN = '{'

  public constructor (registrar: CommandRegistrar) {
    this.registrar = registrar
  }

  public parse (signature: string): CommandSignature {
    if (!signature) return new CommandSignature([])

    const parsed = []

    const args = signature.split(' ')

    for (const arg of args) {
      const optional = arg.startsWith(CommandSignatureFactory.OPTIONAL_ARGUMENT_TOKEN)
      const identifier = arg.substr(1, arg.length - 2)
      const [key, type] = identifier.split(':')
      const resolvedType = this.registrar.resolveArgumentForKey(type ?? 'string')

      if (!resolvedType) {
        throw new InvalidArgumentException(type)
      }

      const argument = new CommandSignatureArgument(resolvedType, key, optional)

      parsed.push(argument)
    }

    return new CommandSignature(parsed)
  }
}

