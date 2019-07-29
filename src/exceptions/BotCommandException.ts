import BotException from './BotException'
import { IMessageContext } from '../CommandContext'

class BotCommandException extends BotException {
  private err: string

  constructor (err: string) {
    super(err)

    this.err = err
  }

  render (ctx: IMessageContext) {
    ctx.reply(this.err)
  }
}

export default BotCommandException
