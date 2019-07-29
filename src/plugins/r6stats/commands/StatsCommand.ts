import { Message } from 'discord.js'

import { injectable, inject } from 'inversify'
import { ServiceTypes } from '../../../types'

import { playtime, formatListField } from '../../../utilities/formatters'
import { Platform, Gamemode } from '../../../types/Resolvable'

import R6StatsAPI from 'r6stats'
import { BotCommand } from '../../../BotCommand';
import { ICommandContext } from '../../../CommandContext';

@injectable()
class StatsCommand extends BotCommand {
  private api: R6StatsAPI

  public command: string = 'stats'
  public signature: string = '<username:username> <platform:platform> {queue:gamemode}'
  public category: string = 'Stats'

  constructor (
    @inject(ServiceTypes.R6StatsAPI) api: R6StatsAPI
  ) {
    super()

    this.api = api
  }

  async invoke (ctx: ICommandContext): Promise<void|Message|Message[]> {
    if (ctx.args.length < 2) {
      return ctx.reply('Usage: stats <username> <platform> {queue}')
    }

    const { username, platform, queue }: { username: string, platform: Platform, queue: Gamemode } = ctx.getArguments(['username', 'platform', 'queue'])

    const player = await this.api.playerStats({ username: username, platform: platform.key })

    let {
      assists, headshots, revives,
      suicides, barricades_deployed,
      reinforcements_deployed,
      melee_kills, penetration_kills,
      blind_kills, rappel_breaches,
      dbnos, playtime: timePlayed,
      kills, deaths, wins, losses
    } = player.stats.general

    if (queue.key === 'ranked' || queue.key === 'casual') {
      // this is terrible syntax imo...
      // but allows for reassigning deconstructed variables
      ;({ kills, deaths, wins, losses } = player.stats.queue[queue.key])
    }

    const kd = deaths > 0 ? (kills / deaths).toFixed(2) : 'N/A'
    const wlr = losses > 0 ? (wins / losses).toFixed(2) : 'N/A'

    const {
      level, lootbox_probability
    } = player.progression

    const statsUrl = 'https://r6stats.com/stats/' + player.ubisoft_id

    const about = formatListField('About', [
      { key: 'Level', value: level },
      { key: 'Playtime', value: playtime(timePlayed) },
      { key: 'Lootbox Chance', value: `${(lootbox_probability)}%` },
    ])

    const killDeath = formatListField('Kills/Deaths', [
      { key: 'Kills', value: kills },
      { key: 'Deaths', value: deaths },
      { key: 'Assists', value: assists },
      { key: 'K/D', value: kd },
    ])

    const winLoss = formatListField('Wins/Losses', [
      { key: 'Wins', value: wins },
      { key: 'Losses', value: losses },
      { key: 'W/L', value: wlr },
    ])

    const killBreakdown = formatListField('Kill Breakdown', [
      { key: 'Headshots', value: headshots },
      { key: 'Blind Kills', value: blind_kills },
      { key: 'Melee Kills', value: melee_kills },
      { key: 'Penetration Kills', value: penetration_kills },
    ])

    const miscStats = formatListField('Misc.', [
      { key: 'Revives', value: revives },
      { key: 'Suicides', value: suicides },
      { key: 'Barricades', value: barricades_deployed },
      { key: 'Reinforcements', value: reinforcements_deployed },
      { key: 'Rappel Breaches', value: rappel_breaches },
      { key: 'DBNOs', value: dbnos },
    ])

    return ctx.reply({
      embed: {
        color: 3447003,
        author: {
          name: player.username,
          url: statsUrl,
          icon_url: platform.logo
        },
        thumbnail: {
          url: player.avatar_url_146
        },
        title: queue.name + ' Player Stats',
        description: `[View Full Stats for ${player.username}](${statsUrl})`,
        fields: [
          about,
          killDeath,
          winLoss,
          killBreakdown,
          miscStats
        ],
        footer: {
          icon_url: 'https://r6stats.com/img/logos/r6stats-100.png',
          text: 'Stats Provided by R6Stats.com',
          url: 'https://r6stats.com'
        }
      }
    })

  }

}

export default StatsCommand
