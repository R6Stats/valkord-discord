import { Injectable } from '../container/decorators/injectable.decorator'
import { ParsedCommandSignature } from '.'
import { MissingArgumentException } from '../../exceptions/missing-argument.exception'
import { CommandSignature } from './command-signature'

@Injectable()
export class CommandSignatureParser {
  public parse (signature: CommandSignature, args: string[]): ParsedCommandSignature {
    const signatureArgs = signature.getArguments()
    const parsed = []

    let index = 0
    for (const arg of signatureArgs) {
      const type = arg.getType()
      const value = type.parse(index, args, arg)

      if (!value.getValue() && !arg.isOptional()) {
        throw new MissingArgumentException(arg.getKey())
      }

      index += value.getLength()
      parsed.push(value)
    }

    return new ParsedCommandSignature(parsed)
  }
}
