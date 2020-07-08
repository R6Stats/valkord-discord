import { env } from '../../utils/env'
import { ValkordConfig } from './valkord-config'
import { Injectable } from '../container'

export interface DefaultValkordConfigOptions {
  token: string
  prefixes: string[]
  sharded: boolean
  shard_range?: string
  total_shards?: number
}

@Injectable()
export class DefaultValkordConfig extends ValkordConfig<DefaultValkordConfigOptions> {
  public load = (): DefaultValkordConfigOptions => ({
    token: env('DISCORD_TOKEN'),
    prefixes: env('PREFIXES', 'rt').split(','),
    sharded: env('SHARDED', 'false') === 'true',
    shard_range: env('SHARD_RANGE'),
    total_shards: parseInt(env('TOTAL_SHARDS', '1')),
  })
}
