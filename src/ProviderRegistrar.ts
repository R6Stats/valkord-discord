import { injectable } from "inversify";
import GenericRegistrar from "./GenericRegistrar";
import { IProvider, Provider } from "./Provider";

@injectable()
class ProviderRegistrar implements GenericRegistrar<new() => IProvider> {
  registry: (new () => IProvider)[];

  register(clazz: new () => IProvider): void {
    const provider = new clazz()
    provider.register()
    provider.boot()
    console.log(`Registering provider: ${clazz.name}`)
  }
  unregister(clazz: new () => IProvider): void {
    throw new Error("Method not implemented.");
  }


}

export default ProviderRegistrar
