import ArgumentType from "./ArgumentType";

class UsernameArgumentType extends ArgumentType<string> {
  identifier: string = 'username'

  parse (args: string[], begin: number): GenericArgument<string> {
    let index = 1
    let username = args[begin]

    if (username.startsWith('"') || username.startsWith('“') || username.startsWith('”')) {
      while (!(username.endsWith('"') || username.endsWith('“') || username.endsWith('”')) && index < args.length - 1) {
        username += ' ' + args[index]
        index++
      }
      username = username.replace(/"/g, '').replace(/“/g, '').replace(/”/g, '')
    }

    return new GenericArgument(username, index)
  }

}

export default UsernameArgumentType
