import BaseCommand from '../BaseCommand'
import MessageContext from '../MessageContext'
import { Message } from 'discord.js'

class PingCommand extends BaseCommand {

  shouldInvoke (ctx: MessageContext) {
    return ctx.command === 'ping'
  }

  invoke (ctx: MessageContext): Promise<void|Message|Message[]> {
    return ctx.reply('Pong!')
  }

}

export default PingCommand
