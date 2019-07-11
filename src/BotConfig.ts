import { IBotConfig } from "./types";

require('dotenv').config()

class BotConfig implements IBotConfig {
  apiToken?: string
  discordToken?: string

  constructor () {
    this.apiToken = process.env.R6STATS_API_TOKEN
    this.discordToken = process.env.DISCORD_TOKEN
  }

}

export default new BotConfig()
