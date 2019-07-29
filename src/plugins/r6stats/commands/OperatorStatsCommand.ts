import { Message } from 'discord.js'

import { ServiceTypes } from '../../../types'
import { inject } from 'inversify'

import { parseUsername } from '../../../utilities/parsers'
import { resolvePlatform } from '../../../utilities/resolvers'
import { playtime, formatListField } from '../../../utilities/formatters'

import R6StatsAPI from 'r6stats'
import InvalidArgumentException from '../../../exceptions/InvalidArgumentException'
import { BotCommand } from '../../../BotCommand';
import { ICommandContext } from '../../../CommandContext';

class OperatorStatsCommand extends BotCommand {
  private api: R6StatsAPI

  command: string = 'operator'
  category: string = 'Stats'

  constructor (
    @inject(ServiceTypes.R6StatsAPI) api: R6StatsAPI
  ) {
    super()

    this.api = api
  }

  async invoke (ctx: ICommandContext): Promise<void|Message|Message[]> {
    if (ctx.args.length < 3) {
      return ctx.reply('Usage: operator <username> <platform> <operator>')
    }

    const { username, platform, operator: operatorSearch } = this.getParameters(ctx.args)

    const player = await this.api.operatorStats({ username, platform: platform.key })

    const operator = player.operators.find(op => this.normalizeOperator(op.name) === operatorSearch.toLowerCase())

    if (!operator) return ctx.reply(`Operator "${operatorSearch}" not found.`)

    const { name, ctu, badge_image, abilities, kills, deaths, kd, wins, losses, wl } = operator
    const role = (operator.role === 'defender' ? 'Defender' : 'Attacker')
    const timePlayed = playtime(operator.playtime)

    const about = formatListField('About', [
      { key: 'Operator', value: name },
      { key: 'Role', value: role },
      { key: 'CTU', value: ctu },
      { key: 'Playtime', value: timePlayed }
    ])

    const killDeath = formatListField('Kills/Deaths', [
      { key: 'Kills', value: kills },
      { key: 'Deaths', value: deaths },
      { key: 'K/D', value: kd },
    ])

    const winLoss = formatListField('Wins/Losses', [
      { key: 'Wins', value: wins },
      { key: 'Losses', value: losses },
      { key: 'W/L', value: wl },
    ])

    const specials = formatListField('Abilities', abilities.map(a => { return { key: a.ability, value: a.value } }))

    return ctx.reply({
      embed: {
        color: 3447003,
        author: {
          name: player.username + ' Operator Stats',
          url: 'https://r6stats.com/stats/' + player.ubisoft_id,
          icon_url: platform.logo
        },
        thumbnail: {
          url: badge_image
        },
        fields: [
          about,
          killDeath,
          winLoss,
          specials,
        ],
        footer: {
          icon_url: 'https://r6stats.com/img/logos/r6stats-100.png',
          text: 'Stats Provided by R6Stats.com',
          url: 'https://r6stats.com'
        }
      }
    })
  }

  /**
   * Returns a normalized string of the given operator name. Replaces all special characters
   * including accents, tildes, etc. Useful for comparing operators with special names such as Jager.
   *
   * @param {string} name
   */
  normalizeOperator (name: string) {
    return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  getParameters (args: string[]) {
    const { username, end: i } = parseUsername(args)
    const platform = resolvePlatform(args[i + 1])
    const operator = args[i + 2]

    if (!platform) throw new InvalidArgumentException(`The platform ${args[i + 1]} is invalid. Specify pc, xbox, or ps4.`)

    return { username, platform, operator }
  }

}

export default OperatorStatsCommand
