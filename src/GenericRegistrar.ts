interface GenericRegistrar<T, U> {
  register(clazz: T): void
  unregister(clazz: T): void
  getRegistered(): U[]
}

export default GenericRegistrar
