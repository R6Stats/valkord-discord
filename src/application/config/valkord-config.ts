export abstract class ValkordConfig<C extends Record<string, any> = { [key: string]: any }> {
  public config: C

  public init (): void {
    const config = this.load()

    this.config = config
  }

  abstract load (): C

  public get <T extends keyof C>(key: T): C[T] {
    return this.config[key]
  }

  public getConfig (): C {
    return this.config
  }
}
