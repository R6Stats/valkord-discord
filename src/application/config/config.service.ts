import * as dotenv from 'dotenv'
import { env } from '../../utils/env'
import { ValkordConfig } from './client-config'
dotenv.config()

export class ConfigService {
  private readonly config: ValkordConfig

  public constructor () {
    this.config = this.load()
  }

  private load (): ValkordConfig {
    return {
      token: env('DISCORD_TOKEN'),
      prefixes: env('PREFIXES', 'rt').split(','),
      r6stats_token: env('R6STATS_API_KEY'),
    }
  }

  public getConfig (): ValkordConfig {
    return this.config
  }

  public get <T = unknown, C = ValkordConfig, K = keyof C & string>(key: K): T {
    return this.config[key]
  }

  public set (key: string, value: any): void {
    this.config[key] = value
  }
}
