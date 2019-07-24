interface GenericRegistrar<T> {
  registry: T[];

  register(clazz: T): void
  unregister(clazz: T): void
  getRegistered(): T[]
}

export default GenericRegistrar
