class CommandSignature {
  arguments: CommandArgument[] = []

  constructor (signature: string) {
    this.parseSignature(signature)
  }

  parseSignature (signature: string) {
    const args = signature.split(' ')
    for (const arg of args) {
      if (arg.length < 3) continue
      const optional = arg.startsWith('{')
      const ident = arg.substr(1, arg.length - 2)
      const split = ident.split(':')
      const key = split[0]
      const type = split.length > 1 ? split[1] : 'string'

      this.arguments.push(new CommandArgument(key, type, optional))
    }
  }
}

class CommandArgument {
  key: string
  type: string
  optional: boolean

  constructor (key: string, type: string, optional: boolean) {
    this.key = key
    this.type = type
    this.optional = optional
  }
}

export { CommandSignature, CommandArgument }
