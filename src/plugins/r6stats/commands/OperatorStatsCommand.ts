import { Message } from 'discord.js'
import { inject } from 'inversify'
import R6StatsAPI from 'r6stats'
import GenericArgument from '../../../arguments/GenericArgument'
import { BotCommand } from '../../../BotCommand'
import { ICommandContext } from '../../../CommandContext'
import { ServiceTypes } from '../../../types'
import { Platform } from '../../../types/Resolvable'
import { formatListField, playtime } from '../../../utilities/formatters'

interface StatsCommandArguments {
  username: GenericArgument<string>;
  platform: GenericArgument<Platform>;
  operator: GenericArgument<string>;
}

class OperatorStatsCommand extends BotCommand {
  private api: R6StatsAPI

  public command: string = 'operator'
  public category: string = 'Stats'

  public constructor (
    @inject(ServiceTypes.R6StatsAPI) api: R6StatsAPI
  ) {
    super()

    this.api = api
  }

  public async invoke (ctx: ICommandContext): Promise<void|Message|Message[]> {
    if (ctx.args.length < 3) {
      return ctx.reply('Usage: operator <username> <platform> <operator>')
    }

    const {
      username: { value: username },
      platform: { value: platform },
      operator: { value: operatorSearch }
    } = ctx.getArguments<StatsCommandArguments>()

    const player = await this.api.operatorStats({ username, platform: platform.key })

    const operator = player.operators.find((op): {} => this.normalizeOperator(op.name) === operatorSearch.toLowerCase())

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

    const specials = formatListField('Abilities', abilities.map((a) => { return { key: a.ability, value: a.value } }))

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
  public normalizeOperator (name: string): string {
    return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }
}

export default OperatorStatsCommand
