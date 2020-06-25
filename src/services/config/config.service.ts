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
    }
  }

  public getConfig (): ClientConfig {
    return this.config
  }

  public get (key: keyof ClientConfig): string {
    return this.config[key]
  }
}
