import GenericArgument from '../GenericArgument'

interface IArgumentType<T> {
  identifier: string;

  parse (args: string[], begin: number): GenericArgument<T>|null;
}

abstract class ArgumentType<T> implements IArgumentType<T> {
  public identifier: string

  abstract parse (args: string[], begin: number): GenericArgument<T>|null
}

export { IArgumentType, ArgumentType }
