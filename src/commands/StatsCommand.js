import BaseCommand from '../BaseCommand'

import { getPlatform, getGamemode, playtime } from '../utilities'

class StatsCommand extends BaseCommand {

  constructor ({ api }) {
    super(...arguments)
    this._api = api
  }

  shouldInvoke () {
    return this._command === 'stats'
  }

  async invoke () {
    if (this._args.length < 2) {
      return this.reply('Usage: stats <username> <platform> {queue}')
    }

    this.hydrateParameters()

    try {
      var { data: players } = await this._api.playerSearch({ username: this.username, platform: this.platform.name })
      if (!(players && players.length && players.length >= 1)) return this.reply('No players found.')

      var player = players[0]

      var { data: rawStats } = await this._api.playerStats({ uuid: player.ubisoft_id })
      if (!(rawStats)) return this.reply('Stats not found.')
    } catch (e) {
      return this.reply('Stats not found.')
    }

    const stats = rawStats.stats[0]
    const progression = rawStats.progression

    if (this.queue === 'general') {
      var { kills, deaths, wins, losses } = stats.general
    } else if (this.queue === 'ranked') {
      var { kills, deaths, wins, losses } = stats.queue.ranked
    } else if (this.queue === 'casual') {
      var { kills, deaths, wins, losses } = stats.queue.casual
    }

    let kd = deaths > 0 ? (kills / deaths).toFixed(2) : 'N/A'
    let wlr = losses > 0 ? (wins / losses).toFixed(2) : 'N/A'

    let {
      assists, headshots, revives,
      suicides, barricades_deployed,
      reinforcements_deployed,
      melee_kills, penetration_kills,
      blind_kills, rappel_breaches,
      dbnos, playtime: timePlayed
    } = stats.general

    let {
      level, lootbox_probability
    } = progression

    const statsUrl = 'https://r6stats.com/stats/' + player.ubisoft_id

    const title = this.queue.charAt(0).toUpperCase() + this.queue.slice(1)
    this.reply({
      embed: {
        color: 3447003,
        author: {
          name: player.username,
          url: statsUrl,
          icon_url: this.platform.image
        },
        thumbnail: {
          url: `https://ubisoft-avatars.akamaized.net/${ player.ubisoft_id }/default_146_146.png`
        },
        title: title + ' Player Stats',
        description: `[View Full Stats for ${player.username}](${statsUrl})`,
        fields: [
          {
            name: 'About',
            inline: true,
            value: '**Level**: ' + level + '\n'
              + '**Playtime**: ' + playtime(timePlayed) + '\n'
              + '**Lootbox Chance**: ' + (lootbox_probability / 100) + '%'
          },
          {
            name: 'Kill/Deaths',
            inline: true,
            value: '**Kills**: ' + kills + '\n'
              + '**Deaths**: ' + deaths + '\n'
              + '**Assists**: ' + assists + '\n'
              + '**K/D**: ' + kd
          },
          {
            name: 'Win/Loss',
            inline: true,
            value: '**Wins**: ' + wins + '\n'
              + '**Losses**: ' + losses + '\n'
              + '**W/L**: ' + wlr
          },
          {
            name: 'Kills Breakdown',
            inline: true,
            value: '**Headshots**: ' + headshots + '\n'
              + '**Blind Kills**: ' + blind_kills + '\n'
              + '**Melee Kills**: ' + melee_kills + '\n'
              + '**Penetration Kills**: ' + penetration_kills
          },
          {
            name: 'Misc.',
            inline: true,
            value: '**Revives**: ' + revives + '\n'
              + '**Suicides**: ' + suicides + '\n'
              + '**Barricades**: ' + barricades_deployed + '\n'
              + '**Reinforcements**: ' + reinforcements_deployed + '\n'
              + '**Rappel Breaches**: ' + rappel_breaches + '\n'
              + '**DBNOs**: ' + dbnos
          },
        ],
        footer: {
          icon_url: 'https://r6stats.com/img/logos/r6stats-100.png',
          text: 'Stats Provided by R6Stats.com',
          url: 'https://r6stats.com'
        }
      }
    })

  }

  hydrateParameters () {
    let username = this._args[0]
    var i = 1
    if (username.startsWith('"')) {
      while (!username.endsWith('"') && i < this._args.length - 1) {
        username += ' ' + this._args[i]
        i++
      }
      username = username.replace(/"/g, '')
    }
    let platform = getPlatform(this._args[i].toLowerCase())
    let queue = getGamemode(this._args[i+1] ? this._args[i+1].toLowerCase() : null)
    if (!platform) {
      return this.reply(`The platform ${ this._args[i] } is invalid. Specify pc, xbox, or ps4.`)
    }
    this.platform = platform
    this.queue = queue || 'general'
    this.username = username
  }

}

export default StatsCommand
