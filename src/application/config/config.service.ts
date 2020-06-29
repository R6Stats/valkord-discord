import * as dotenv from 'dotenv'
import { env } from '../../utils/env'
import { ClientConfig } from './client-config'
dotenv.config()

export class ConfigService {
  private readonly config: ClientConfig

  public constructor () {
    this.config = this.load()
  }

  private load (): ClientConfig {
    return {
      token: env('DISCORD_TOKEN'),
      prefixes: env('PREFIXES', 'rt').split(','),
      r6stats_token: env('R6STATS_API_KEY'),
    }
  }

  public getConfig (): ClientConfig {
    return this.config
  }

  public get <T = unknown>(key: keyof ClientConfig): T {
    return this.config[key]
  }
}
