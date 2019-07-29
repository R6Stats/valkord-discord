import { BotCommand } from '../BotCommand'
import { ICommandContext } from '../CommandContext'
import { Message } from 'discord.js'

class InviteCommand extends BotCommand {
  public command: string = 'invite'
  public category: string = 'Other'

  public invoke (ctx: ICommandContext): Promise<void|Message|Message[]> {
    return ctx.reply({
      embed: {
        color: 3447003,
        title: 'R6Stats Bot Invite',
        description: 'Invite the **R6Stats** bot to your server [here](https://discordapp.com/oauth2/authorize?client_id=334153242152009739&scope=bot&permissions=19456).',
        thumbnail: {
          url: 'https://r6stats.com/img/logos/r6stats-100.png',
        },
        footer: {
          icon_url: 'https://r6stats.com/img/logos/r6stats-100.png',
          text: 'Stats Provided by R6Stats.com',
          url: 'https://r6stats.com'
        }
      }
    })
  }
}


export default InviteCommand
