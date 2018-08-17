import BaseCommand from '../BaseCommand'

import { getPlatform, getGamemode } from '../utilities'

class StatsCommand extends BaseCommand {

  constructor ({ api }) {
    super(...arguments)
    this._api = api
  }

  shouldInvoke() {
    return this._command === 'stats'
  }

  async invoke () {
    if (this._args.length < 2) {
      return this.reply('Usage: stats <username> <platform>')
    }

    this.hydrateParamaters()

    const { data: players } = await this._api.playerSearch({ username: this.username, platform: this.platform.name })
    if (!(players && players.length && players.length >= 1)) return this.reply('No players found.')

    const player = players[0]

    const { data: rawStats } = await this._api.playerStats({ uuid: player.ubisoft_id })
    if (!(rawStats)) return this.reply('Stats not found.')

    const stats = rawStats.stats[0]

    if (this.queue === "general") {
      var { kills, deaths, wins, losses } = stats.general
    } else if (this.queue === "ranked") {
      var { kills, deaths, wins, losses } = stats.queue.ranked
    } else if (this.queue === "casual") {
      var { kills, deaths, wins, losses } = stats.queue.casual
    }

    let kd = deaths > 0 ? (kills / deaths).toFixed(2) : 'N/A'
    let wlr = losses > 0 ? (wins / losses).toFixed(2) : 'N/A'

    let { assists, headshots, revives, suicides, barricades_deployed, reinforcements_deployed, melee_kills, penetration_kills } = stats.general


    // headshots = headshots.toLocaleString()
    // kills = kills.toLocaleString()
    // deaths = deaths.toLocaleString()
    // wins = wins.toLocaleString()
    // losses = losses.toLocaleString()

    const title = this.queue.charAt(0).toUpperCase() + this.queue.slice(1)

    this.reply({
      embed: {
        color: 3447003,
          author: {
            name: stats.username,
            url: 'https://alpha.r6stats.com/stats/' + player.ubisoft_id,
            icon_url: this.platform.image
          },
          title: title + ' Player Stats',
          fields: [
            {
              name: 'Kill/Deaths',
              inline: true,
              value: '**Kills**: ' + kills + '\n'
                + '**Deaths**: ' + deaths + '\n'
                + '**Assists**: ' + assists + '\n'
                + '**K/D**: ' + kd + '\n'
            },
            {
              name: 'Win/Loss',
              inline: true,
              value: '**Wins**: ' + wins + '\n'
                + '**Losses**: ' + losses + '\n'
                + '**W/L**: ' + wlr + '\n'
            },
            {
              name: 'Accuracy',
              inline: true,
              value: '**Headshots**: ' + headshots + '\n'
            },
            {
              name: 'Misc.',
              inline: true,
              value: '**Revives**: ' + revives + '\n'
                + '**Suicides**: ' + suicides + '\n'
                + '**Barricades**: ' + barricades_deployed + '\n'
                + '**Reinforcements**: ' + reinforcements_deployed + '\n'
                + '**Melee Kills**: ' + melee_kills + '\n'
                + '**Penetration Kills**: ' + penetration_kills + '\n'
            },
          ],
          footer: {
            icon_url: 'https://alpha.r6stats.com/img/logos/r6stats-logo-100.png',
            text: "Stats Provided by R6Stats.com",
            url: 'https://alpha.r6stats.com'
          }
      }
    })

  }

  hydrateParamaters () {
    let username = this._args[0]
    var i = 1
    if (username.startsWith('"')) {
      while (!username.endsWith('"') && i < this._args.length - 1) {
        username += " " + this._args[i]
        i++
      }
      username = username.replace(/"/g, '')
    }
    let platform = getPlatform(this._args[i])
    let queue = getGamemode(this._args[i+1])
    if (!platform) {
      return this.reply(`The platform ${ this._args[i] } is invalid. Specify pc, xbox, or ps4.`)
    }
    this.reply(`Username: ${ username }, Platform: ${ platform ? platform.name : 'Undefined' }, Gamemode: ${ queue ? queue : 'Not Specified' }`)
    this.platform = platform
    this.queue = queue || "general"
    this.username = username
  }

}

export default StatsCommand
