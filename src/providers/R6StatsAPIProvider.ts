'use strict'

import container from './../../inversify'
import { TYPES, IBotConfig } from '../types';
import R6StatsAPI from 'r6stats';

class R6StatsAPIProvider extends Provider {
  register (): void {
    const config = container.get<IBotConfig>(TYPES.Config)
    config
    container.bind<R6StatsAPI>(TYPES.R6StatsAPI).toConstantValue(new R6StatsAPI({ config }))
  }
}
