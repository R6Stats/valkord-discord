import GenericRegistrar from '../GenericRegistrar'
import { ArgumentType } from './types/ArgumentType'

class ArgumentRegistrar<T> implements GenericRegistrar<new () => ArgumentType<T>> {
  public registry: (new () => ArgumentType<T>)[];
  private registeredTypes: Map<string, ArgumentType<T>> = new Map()

  public register(clazz: new () => ArgumentType<T>): void {
    const ref = new clazz()

    this.registeredTypes.set(ref.identifier, ref)
  }

  public unregister(): void {
    throw new Error('Method not implemented.')
  }

  public getAvailableTypes (): Map<string, ArgumentType<T>> {
    return this.registeredTypes
  }

  public getTypeForIdentifier (identifier: string): ArgumentType<T> {
    return this.registeredTypes.get(identifier)
  }
}

export default ArgumentRegistrar
