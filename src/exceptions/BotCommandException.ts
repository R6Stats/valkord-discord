import BotException from './BotException'
import CommandContext from '../CommandContext'

class BotCommandException extends BotException {
  private err: string

  constructor (err: string) {
    super(err)

    this.err = err
  }

  render (ctx: CommandContext) {
    ctx.reply(this.err)
  }
}

export default BotCommandException
