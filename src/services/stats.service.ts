import { Injectable } from '../decorators/injectable.decorator'
import { ConfigService } from './config/config.service'
import { OnModuleBoot } from '../container'
import R6StatsAPI from '@r6stats/node'

@Injectable()
export class StatsService implements OnModuleBoot {
  private readonly config: ConfigService
  private client: R6StatsAPI

  public constructor (config: ConfigService) {
    this.config = config
  }

  public boot (): void {
    const { r6stats_token: apiKey } = this.config.getConfig()

    const api = new R6StatsAPI({ apiKey })

    this.client = api
  }

  public async search (username: string, platform: string) {
    return this.client.playerStats({ username, platform })
  }
}
