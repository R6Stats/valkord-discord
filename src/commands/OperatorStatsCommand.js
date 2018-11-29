import BaseCommand from '../BaseCommand'

import { getPlatform, playtime } from '../utilities'

class OperatorStatsCommand extends BaseCommand {

  constructor ({ api }) {
    super(...arguments)
    this._api = api
  }

  shouldInvoke () {
    return this._command === 'operator'
  }

  async invoke () {
    if (this._args.length < 3) {
      return this.reply('Usage: operator <username> <platform> <operator>')
    }

    this.hydrateParameters()

    const { data: players } = await this._api.playerSearch({ username: this.username, platform: this.platform.name })
    if (!(players && players.length && players.length >= 1)) return this.reply('No players found.')

    const player = players[0]

    const { data: { operators } } = await this._api.playerStats({ uuid: player.ubisoft_id })
    if (!(operators)) return this.reply('Stats not found.')

    const operator = operators.find(op => op.operator.internal_name === this.operator.toLowerCase())

    if (!operator) return this.reply('Operator not found.')

    let { operator: { name, role, ctu, images: { badge } }, abilities, kills, deaths, kd, wins, losses, wl, playtime: timePlayed } = operator
    role = (role === 'defender' ? 'Defender' : 'Attacker')
    timePlayed = playtime(timePlayed)

    let specialLine = ''
    for (let ability of abilities) {
      specialLine += '**' + ability.title + '**: ' + ability.value + '\n'
    }

    this.reply({
      embed: {
        color: 3447003,
        author: {
          name: player.username + ' Operator Stats',
          url: 'https://r6stats.com/stats/' + player.ubisoft_id,
          icon_url: this.platform.image
        },
        thumbnail: {
          url: badge
        },
        fields: [
          {
            name: 'About',
            inline: true,
            value: '**Operator**: ' + name + '\n'
              + '**Role**: ' + role + '\n'
              + '**CTU**: ' + ctu + '\n'
              + '**Playtime** ' + timePlayed + '\n'
          },
          {
            name: 'Kill/Death',
            inline: true,
            value: '**Kills**: ' + kills + '\n'
              + '**Deaths**: ' + deaths + '\n'
              + '**K/D**: ' + kd + '\n'
          },
          {
            name: 'Win/Loss',
            inline: true,
            value: '**Wins**: ' + wins + '\n'
              + '**Losses**: ' + losses + '\n'
              + '**W/L**: ' + wl + '\n'
          },
          {
            name: 'Specials',
            inline: true,
            value: specialLine
          }
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
    let operator = this._args[i+1]
    if (!platform) {
      return this.reply(`The platform ${ this._args[i] } is invalid. Specify pc, xbox, or ps4.`)
    }
    this.platform = platform
    this.operator = operator
    this.username = username
  }

}

export default OperatorStatsCommand
