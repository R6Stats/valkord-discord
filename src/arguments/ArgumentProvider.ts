import { Provider } from '../Provider';
import container from '../../inversify.config';
import ArgumentRegistrar from './ArgumentRegistrar';
import { ServiceTypes } from '../types';
import UsernameArgumentType from './types/UsernameArgumentType';
import PlatformArgumentType from './types/PlatformArgumentType';
import StringArgumentType from './types/StringArgumentType';

class ArgumentProvider extends Provider {
  private defaultTypes = [
    StringArgumentType,
    UsernameArgumentType,
    PlatformArgumentType,
  ]

  boot () {
    const argRegistrar = container.get<ArgumentRegistrar<any>>(ServiceTypes.ArgumentRegistrar)

    this.defaultTypes.forEach(t => argRegistrar.register(t))
  }
}

export default ArgumentProvider
