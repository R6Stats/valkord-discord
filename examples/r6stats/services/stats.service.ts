import R6StatsAPI, { GenericStatsResponse, OperatorStatsResponse } from '@r6stats/node'
import { Injectable } from '../../../src/application/container'
import { OnModuleBoot } from '../../../src/application/container/container'
import { R6StatsModuleConfig } from '../r6stats.module'

@Injectable()
export class StatsService implements OnModuleBoot {
  private readonly config: R6StatsModuleConfig
  private client: R6StatsAPI

  public constructor (config: R6StatsModuleConfig) {
    this.config = config
  }

  public boot (): void {
    const { r6stats_token: apiKey } = this.config.getConfig()

    const api = new R6StatsAPI({ apiKey })

    this.client = api
  }

  public async getStats (username: string, platform: string): Promise<GenericStatsResponse> {
    return this.client.playerStats({ username, platform })
  }

  public async getOperatorStats (username: string, platform: string): Promise<OperatorStatsResponse> {
    return this.client.operatorStats({ username, platform })
  }
}
