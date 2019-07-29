class BotException extends Error {
  public constructor (err: string) {
    super(err)
  }
}

export default BotException
