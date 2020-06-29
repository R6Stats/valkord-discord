import { Message, MessageEmbed } from 'discord.js'
import { Injectable } from '../../../application/container'
import { LOGO_URL } from '../constants'
import { ClientCommand, CommandContext, CommandSignatureArgumentValue } from '../../../application/commands'
import { StatsService } from '../services/stats.service'
import { EmbedField } from '../../../utils/embeds'
import { formatNumber, playtime } from '../utils/formatting'
import { getPlatformImage } from '../utils/resolvers'

export interface OperatorStatsCommandArguments {
  username: CommandSignatureArgumentValue<string>
  platform: CommandSignatureArgumentValue<string>
  operator: CommandSignatureArgumentValue<string>
}

@Injectable()
export class OperatorStatsCommand extends ClientCommand {
  public command = 'operator'
  public signature = '<username:string> <platform:string> <operator:string>'
  public readonly name = 'Operator Stats'
  public readonly group = 'Stats'
  public readonly shortHelp = 'r6s stats <username> <platform> <operator>'

  private readonly stats: StatsService

  public constructor (stats: StatsService) {
    super()

    this.stats = stats
  }

  public async handle (ctx: CommandContext): Promise<Message | Message[] | void> {
    const { username: { value: username }, platform: { value: platform }, operator: { value: operatorSearch } } = ctx.signature.get<OperatorStatsCommandArguments>()

    const player = await this.stats.getOperatorStats(username, platform)

    const operator = player.operators.find(f => f.name.toLowerCase() === operatorSearch.toLowerCase())

    if (!operator) {
      return ctx.reply(`The operator '${operatorSearch}' was not found.`)
    }

    const url = `https://r6stats.com/stats/${player.ubisoft_id}`

    const { name, role, ctu, abilities: abilityList, kills, deaths, kd, wins, losses, wl, playtime: timePlayed } = operator

    const about = new EmbedField()
      .name('About')
      .line('Operator', name)
      .line('Role', role)
      .line('CTU', ctu)
      .line('Playtime', playtime(timePlayed, 'days'))
      .build()

    const killsDeaths = new EmbedField()
      .name('Kills/Deaths')
      .line('Kills', formatNumber(kills))
      .line('Deaths', formatNumber(deaths))
      .line('K/D', kd)
      .build()

    const winsLosses = new EmbedField()
      .name('Wins/Losses')
      .line('Wins', formatNumber(wins))
      .line('Losses', formatNumber(losses))
      .line('W/L', wl)
      .build()

    const builder = new EmbedField()
      .name('Abilities')

    for (const ability of abilityList) {
      builder.line(ability.ability, formatNumber(ability.value))
    }

    const abilities = builder.build()

    const embed = new MessageEmbed()
      .setColor('#f4bb0c')
      .setAuthor(player.username, getPlatformImage(platform), url)
      .setThumbnail(operator.badge_image)
      .setTitle('Player Stats')
      .setDescription(`[View Full Stats for ${player.username}](${url})`)
      .setFooter('Stats Provided by R6Stats.com', LOGO_URL)
      .addFields([about, killsDeaths, winsLosses, abilities])

    return ctx.reply(embed)
  }
}
