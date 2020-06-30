export class ClientException extends Error {
  public constructor (message: string) {
    super(message)

    Object.setPrototypeOf(this, ClientException.prototype)
  }
}
