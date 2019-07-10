
require('dotenv').config()

class BotConfig implements BotConfig {

  constructor () {
    this.apiToken = process.env.R6STATS_API_TOKEN
    this.discordToken = process.env.DISCORD_TOKEN
  }

}
