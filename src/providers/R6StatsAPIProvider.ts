'use strict'

import container from '../../inversify.config'
import R6StatsAPI from 'r6stats';
import BotConfig from '../BotConfig';
import { decorate, injectable, inject } from 'inversify';
import { ServiceTypes } from '../types';

class R6StatsAPIProvider implements Provider {
  // @inject(ServiceTypes.Config)
  // config: BotConfig
  api: R6StatsAPI

  boot (): void {
    decorate(injectable(), R6StatsAPI)
    // console.log(this.config)
    const config = container.get<BotConfig>(ServiceTypes.Config)
    const apiKey = config.apiToken
    this.api = new R6StatsAPI({ apiKey })
  }

  register () {
    container.bind<R6StatsAPI>(ServiceTypes.R6StatsAPI).toConstantValue(this.api)
  }
}

export default R6StatsAPIProvider
