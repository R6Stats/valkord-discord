import BotCommandException from './BotCommandException'

class InvalidArgumentException extends BotCommandException {
  constructor (err: string) {
    super(err)
  }
}

export default InvalidArgumentException
