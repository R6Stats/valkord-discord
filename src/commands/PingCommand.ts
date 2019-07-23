import BaseCommand from '../BaseCommand'
import MessageContext from '../MessageContext'

class PingCommand extends BaseCommand {

  shouldInvoke (ctx: MessageContext) {
    return ctx.command === 'ping'
  }

  invoke (ctx: MessageContext) {
    ctx.reply('Pong!')
  }

}

export default PingCommand
