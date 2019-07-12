import container from '../../inversify.config';
import BotConfig from '../BotConfig';
import { ServiceTypes } from '../types';

class ConfigProvider implements Provider {
  boot (): void {}

  register () {
    container.bind<BotConfig>(ServiceTypes.Config).to(BotConfig)
  }
}

export default ConfigProvider
