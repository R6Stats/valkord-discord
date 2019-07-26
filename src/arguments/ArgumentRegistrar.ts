import GenericRegistrar from '../GenericRegistrar';
import { ArgumentType } from './types/ArgumentType';
import UsernameArgumentType from './types/UsernameArgumentType';

class ArgumentRegistrar<T> implements GenericRegistrar<new () => ArgumentType<T>> {
  registry: (new () => ArgumentType<T>)[];
  private registeredTypes: Map<string, ArgumentType<T>> = new Map()

  register(clazz: new () => ArgumentType<T>): void {
    const ref = new clazz()

    this.registeredTypes.set(ref.identifier, ref)
  }

  unregister(clazz: new () => ArgumentType<T>): void {
    throw new Error('Method not implemented.');
  }

  public getAvailableTypes () {
    return this.registeredTypes
  }

  public getTypeForIdentifier (identifier: string) {
    return this.registeredTypes.get(identifier)
  }
}

export default ArgumentRegistrar
