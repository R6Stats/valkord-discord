import { injectable } from "inversify";
import GenericRegistrar from "./GenericRegistrar"
import { IProvider } from "./Provider"
import chalk from 'chalk'

@injectable()
class ProviderRegistrar implements GenericRegistrar<new() => IProvider> {
  registry: (new () => IProvider)[];

  register(clazz: new () => IProvider): void {
    const provider = new clazz()
    provider.register()
    provider.boot()
    console.log(chalk.green(`Registered provider ${clazz.name}!`))
  }
  unregister(clazz: new () => IProvider): void {
    throw new Error("Method not implemented.");
  }


}

export default ProviderRegistrar
