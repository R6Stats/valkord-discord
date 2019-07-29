import BotException from './BotException'
import { IMessageContext } from '../CommandContext'

class BotCommandException extends BotException {
  private err: string

  public constructor (err: string) {
    super(err)

    this.err = err
  }

  public render (ctx: IMessageContext): void {
    ctx.reply(this.err)
  }
}

export default BotCommandException
