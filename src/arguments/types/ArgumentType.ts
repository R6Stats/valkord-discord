abstract class ArgumentType<T> {
  identifier: string;

  abstract parse (args: string[], begin: number): GenericArgument<T>|null
}

export default ArgumentType
