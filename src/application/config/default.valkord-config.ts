import { env } from '../../utils/env'
import { ValkordConfig } from './valkord-config'

export interface DefaultValkordConfigOptions {
  token: string
  prefixes: string[]
}

export class DefaultValkordConfig extends ValkordConfig<DefaultValkordConfigOptions> {
  public load = (): DefaultValkordConfigOptions => ({
    token: env('DISCORD_TOKEN'),
    prefixes: env('PREFIXES', 'rt').split(','),
  })
}
