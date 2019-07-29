import { IBotConfig } from './types'
import { injectable } from 'inversify'

require('dotenv').config()

@injectable()
class BotConfig implements IBotConfig {
  public apiToken?: string
  public discordToken?: string

  public constructor () {
    this.apiToken = process.env.R6STATS_API_TOKEN
    this.discordToken = process.env.DISCORD_TOKEN
  }
}

export default BotConfig
