class BotException extends Error {
  constructor (err: string) {
    super(err)
  }
}

export default BotException
