import BotException from './BotException'
import MessageContext from '../MessageContext'

class BotCommandException extends BotException {
  private err: string

  constructor (err: string) {
    super(err)

    this.err = err
  }

  render (ctx: MessageContext) {
    ctx.reply(this.err)
  }
}

export default BotCommandException
