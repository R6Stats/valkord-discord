import { env } from '../../utils/env'
import { ValkordConfig } from './valkord-config'
import { Injectable } from '../container'

export interface DefaultValkordConfigOptions {
  token: string
  prefixes: string[]
}

@Injectable()
export class DefaultValkordConfig extends ValkordConfig<DefaultValkordConfigOptions> {
  public load = (): DefaultValkordConfigOptions => ({
    token: env('DISCORD_TOKEN'),
    prefixes: env('PREFIXES', 'rt').split(','),
  })
}
