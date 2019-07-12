import { IBotConfig } from "./types";
import { injectable } from 'inversify';

require('dotenv').config()

@injectable()
class BotConfig implements IBotConfig {
  apiToken?: string
  discordToken?: string

  constructor () {
    this.apiToken = process.env.R6STATS_API_TOKEN
    this.discordToken = process.env.DISCORD_TOKEN
  }

}

export default BotConfig
