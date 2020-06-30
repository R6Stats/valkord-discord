import { ClientException } from './client.exception'

export class InvalidArgumentException extends ClientException {
  public constructor (type: string) {
    super(`The argument type '${type}' is not registered!`)

    Object.setPrototypeOf(this, InvalidArgumentException.prototype)
  }
}
