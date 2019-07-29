import BotCommandException from './BotCommandException'

class InvalidArgumentException extends BotCommandException {
  public constructor (err: string) {
    super(err)
  }
}

export default InvalidArgumentException
