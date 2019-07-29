interface GenericRegistrar<T> {
  registry: T[];

  register (clazz: T): void;
  unregister (clazz: T): void;
}

export default GenericRegistrar
