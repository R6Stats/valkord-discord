import container from '../../inversify.config'
import BotConfig from '../BotConfig'
import { ServiceTypes } from '../types'
import { Provider } from '../Provider';

class ConfigProvider extends Provider {
  register (): void {
    container.bind<BotConfig>(ServiceTypes.Config).to(BotConfig)
  }
}

export default ConfigProvider
