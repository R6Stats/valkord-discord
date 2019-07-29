class CommandSignature {
  arguments: CommandSignatureArgument[] = []
  rawSignature: string;

  constructor (signature: string) {
    this.rawSignature = signature

    this.parse(signature)
  }

  parse (signature: string) {
    this.arguments = []

    const args = signature.split(' ')
    for (const arg of args) {
      if (arg.length < 3) continue
      const optional = arg.startsWith('{')
      const ident = arg.substr(1, arg.length - 2)
      const split = ident.split(':')
      const key = split[0]
      const type = split.length > 1 ? split[1] : 'string'

      this.arguments.push(new CommandSignatureArgument(key, type, optional))
    }
  }

  getMinLength () {
    return this.arguments.length
  }
}

class CommandSignatureArgument {
  key: string
  type: string
  optional: boolean

  constructor (key: string, type: string, optional: boolean) {
    this.key = key
    this.type = type
    this.optional = optional
  }
}

export { CommandSignature, CommandSignatureArgument }
