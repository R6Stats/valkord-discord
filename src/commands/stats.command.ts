import { Message, MessageEmbed } from 'discord.js'
import { Injectable } from '../decorators/injectable.decorator'
import { Command, CommandContext, } from './command'
import { StatsService } from '../services/stats.service'
import { EmbedField } from '../utils/embeds'
import { playtime, formatNumber } from '../utils/formatting'
import { getPlatformImage } from '../utils/resolvers'
import { LOGO_URL } from '../constants'

@Injectable()
export class StatsCommand extends Command {
  public command = 'stats'
  public signature = '<username:string> <platform:string> {queue:string}'

  private readonly stats: StatsService

  public constructor (stats: StatsService) {
    super()

    this.stats = stats
  }

  public async handle (ctx: CommandContext): Promise<Message | Message[] | void> {
    const { username: { value: username }, platform: { value: platform }, queue: { value: queue = 'general' } = {} } = ctx.signature.get()

    const player = await this.stats.getStats(username, platform)
    const url = `https://r6stats.com/stats/${player.ubisoft_id}`

    const about = new EmbedField()
      .name('About')
      .line('Level', player.progression.level)
      .line('Playtime', playtime(player.stats.general.playtime, 'days'))
      .line('Lootbox Chance', (player.progression.lootbox_probability / 100) + '%')
      .build()

    const { kills, deaths, wins, losses, kd, wl } = queue === 'general' ? player.stats.general : player.stats.queue[queue === 'casual' ? 'casual' : 'ranked']

    const {
      assists, headshots, revives,
      suicides, barricades_deployed,
      reinforcements_deployed,
      melee_kills, penetration_kills,
      blind_kills, rappel_breaches,
      dbnos
    } = player.stats.general

    const killsDeaths = new EmbedField()
      .name('Kills/Deaths')
      .line('Kills', formatNumber(kills))
      .line('Deaths', formatNumber(deaths))
      .line('Assists', formatNumber(assists))
      .line('K/D', kd)
      .build()

    const winsLosses = new EmbedField()
      .name('Wins/Losses')
      .line('Wins', formatNumber(wins))
      .line('Losses', formatNumber(losses))
      .line('W/L', wl)
      .build()

    const killsBreakdown = new EmbedField()
      .name('Kills Breakdown')
      .line('Headshots', formatNumber(headshots))
      .line('Blind Kills', formatNumber(blind_kills))
      .line('Melee Kills', formatNumber(melee_kills))
      .line('Penetration Kills', formatNumber(penetration_kills))
      .line('W/L', wl)
      .build()

    const miscStats = new EmbedField()
      .name('Misc.')
      .line('Revives', formatNumber(revives))
      .line('Suicides', formatNumber(suicides))
      .line('Barricades', formatNumber(barricades_deployed))
      .line('Reinforcements', formatNumber(reinforcements_deployed))
      .line('Rappel Breaches', formatNumber(rappel_breaches))
      .line('DBNOs', formatNumber(dbnos))
      .build()

    const embed = new MessageEmbed()
      .setColor('#f4bb0c')
      .setAuthor(player.username, getPlatformImage(platform), url)
      .setThumbnail(player.avatar_url_256)
      .setTitle('Player Stats')
      .setDescription(`[View Full Stats for ${player.username}](${url})`)
      .setFooter('Stats Provided by R6Stats.com', LOGO_URL)
      .addFields([about, killsDeaths, winsLosses, killsBreakdown, miscStats])

    return ctx.reply(embed)
  }
}
