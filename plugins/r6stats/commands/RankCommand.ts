import BaseCommand from '../../../BaseCommand'
import MessageContext from '../../../MessageContext'
import { Message } from 'discord.js'

import { injectable, inject } from 'inversify'
import { ServiceTypes } from '../../../types'

import { RANKS } from '../../../constants'
import { parseUsername } from '../../../utilities/parsers'
import { resolveRankedRegion, resolvePlatform } from '../../../utilities/resolvers'

import R6StatsAPI from 'r6stats'
import { formatListField } from '../../../utilities/formatters'
import { RankedRegion } from '../../../types/Resolvable'
import InvalidArgumentException from '../../../exceptions/InvalidArgumentException'

@injectable()
class RankCommand extends BaseCommand {
  private api: R6StatsAPI

  command: string = 'rank'
  aliases: string[] = ['season', 'seasonal']
  category: string = 'Stats'

  constructor (
    @inject(ServiceTypes.R6StatsAPI) api: R6StatsAPI
  ) {
    super()

    this.api = api
  }

  async invoke (ctx: MessageContext): Promise<void|Message|Message[]> {
    if (ctx.args.length < 2) {
      return ctx.reply('Usage: rank <username> <platform> {region} {season}')
    }

    const { username, platform, region, season: seasonId } = this.getParameters(ctx.args)

    const player = await this.api.seasonalStats({ username, platform: platform.key })

    // const seasons = Object.values(player.seasons).sort((a, b) => (b. - a.end_date))
    // let season, region
    // var self = this

    // if (!seasonId) {
    //   season = seasons[0]
    // } else {
    //   season = seasons.find(season => self.season === season.id)
    // }

    const key = Object.keys(player.seasons)[0]
    const season = player.seasons[key]

    if (!season) {
      return ctx.reply('Season not found.')
    }

    const regionalStats = region ? season.regions[region.key][0] : Object.values(season.regions).map(r => r[0]).sort((a, b) => (b.max_rank - a.max_rank))[0]

    const { wins, losses, abandons, max_mmr, mmr, prev_rank_mmr, next_rank_mmr, skill_mean, skill_standard_deviation, rank, max_rank } = regionalStats

    const selectedRegion = resolveRankedRegion(regionalStats.region)

    const title = `Operation ${season.name} Stats for ${player.username} in ${selectedRegion.name}`
    const statsUrl = `https://r6stats.com/stats/${player.ubisoft_id}/seasons`

    const aboutRank = formatListField('Rank', [
      { key: 'Current MMR', value: mmr },
      { key: 'Current Rank', value: RANKS[rank].name },
      { key: 'Max MMR', value: Number(max_mmr).toFixed(2) },
      { key: 'Max Rank', value: RANKS[max_rank].name },
      { key: 'Skill', value: Number(skill_mean).toFixed(2) + ' ± ' + Number(skill_standard_deviation).toFixed(2) },
    ])

    const progress = formatListField('Progress', [
      { key: 'Previous Rank', value: prev_rank_mmr },
      { key: 'Current MMR', value: mmr },
      { key: 'Next Rank', value: next_rank_mmr },
    ])

    const matches = formatListField('Matches', [
      { key: 'Wins', value: wins },
      { key: 'Losses', value: losses },
      { key: 'W/L', value: (losses === 0 ? 'n/a' : Number(wins / losses).toFixed(2))  },
      { key: 'Abandons', value: abandons }
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
          url: `https://cdn.r6stats.com/seasons/rank-imgs/${RANKS[max_rank].img.replace('svg', 'png')}`
        },
        title,
        description: `[View Full Stats for ${player.username}](${statsUrl})`,
        fields: [
          aboutRank,
          progress,
          matches
        ],
        footer: {
          icon_url: 'https://r6stats.com/img/logos/r6stats-100.png',
          text: 'Stats Provided by R6Stats.com',
          url: 'https://r6stats.com'
        }
      }
    })

  }

  getParameters (args: string[]) {
    const { username, end: i } = parseUsername(args)
    const platform = resolvePlatform(args[i + 1])

    if (!platform) throw new InvalidArgumentException(`The platform "${args[i + 1]}" is invalid. Specify pc, xbox, or ps4.`)

    let region: RankedRegion, season

    if (args.length === i + 1) {
      const intVal = parseInt(args[i + 2])
      if (!Number.isNaN(intVal)) {
        season = intVal
      } else {
        region = resolveRankedRegion(args[i + 2])
      }
    } else if (args.length > i + 1) {
      region = resolveRankedRegion(args[i + 2])
      season = parseInt(args[i + 3])
    }

    return { username, platform, region, season }
  }

}

export default RankCommand
