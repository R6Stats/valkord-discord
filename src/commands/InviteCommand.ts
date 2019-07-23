import BaseCommand from '../BaseCommand'
import MessageContext from '../MessageContext'

class InviteCommand extends BaseCommand {

  shouldInvoke (ctx: MessageContext) {
    return ctx.command === 'invite'
  }

  invoke (ctx: MessageContext) {
    ctx.reply({
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
