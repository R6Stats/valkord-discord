class CommandSignatureArgument {
  public key: string
  public type: string
  public optional: boolean

  public constructor (key: string, type: string, optional: boolean) {
    this.key = key
    this.type = type
    this.optional = optional
  }
}

class CommandSignature {
  public arguments: CommandSignatureArgument[] = []
  public rawSignature: string;

  public constructor (signature: string) {
    this.rawSignature = signature

    this.parse(signature)
  }

  public parse (signature: string): void {
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

  public getMinLength (): number {
    return this.arguments.length
  }
}



export { CommandSignature, CommandSignatureArgument }
