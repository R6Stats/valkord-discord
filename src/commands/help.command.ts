import { Command, CommandContext, CommandRegistrar } from './command'
import { Injectable } from '../decorators/injectable.decorator'
import { Message, MessageEmbed } from 'discord.js'
import { PRIMARY_COLOR, LOGO_URL } from '../constants'
import { EmbedField } from '../utils/embeds'

@Injectable()
export class HelpCommand extends Command {
  public readonly command: string = 'help'

  private readonly commands: CommandRegistrar

  public constructor (commands: CommandRegistrar) {
    super()

    this.commands = commands
  }

  public handle (ctx: CommandContext): Promise<void | Message | Message[]> {
    const commands = this.commands.getCommands()

    const grouped = commands.filter(c => !!c.name).reduce((acc, c) => {
      if (!acc.hasOwnProperty(c.group)) acc[c.group] = []
      acc[c.group].push(c)
      return acc
    }, {})

    const embed = new MessageEmbed()
      .setColor(PRIMARY_COLOR)
      .setTitle('R6Stats Bot Help')
      .setDescription('Options in <...> are required. Options in {...} are optional.')
      .setThumbnail(LOGO_URL)
      .setFooter('Stats Provided by R6Stats.com', LOGO_URL)

    const fields = []

    for (const group in grouped) {
      const groupCommands = grouped[group]

      const field = new EmbedField()
        .name(group)

      for (const groupCommand of groupCommands) {
        field.line(groupCommand.name, groupCommand.shortHelp)
      }

      fields.push(field.build())
    }

    embed.addFields(fields)

    return ctx.reply(embed)
  }
}
