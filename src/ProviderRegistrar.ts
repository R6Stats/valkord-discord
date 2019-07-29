import chalk from 'chalk'
import { injectable } from 'inversify'
import GenericRegistrar from './GenericRegistrar'
import { IProvider } from './Provider'

@injectable()
class ProviderRegistrar implements GenericRegistrar<new() => IProvider> {
  public registry: (new () => IProvider)[];

  public register(clazz: new () => IProvider): void {
    const provider = new clazz()
    provider.register()
    provider.boot()
    console.log(chalk.green(`Registered provider ${clazz.name}!`))
  }

  public unregister(): void {
    throw new Error("Method not implemented.")
  }
}

export default ProviderRegistrar
