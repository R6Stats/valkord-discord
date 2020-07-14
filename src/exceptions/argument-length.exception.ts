import { ClientException } from './client.exception'

export class ArgumentLengthException extends ClientException {
  public constructor () {
    super(`The parameters are invalid!`)

    Object.setPrototypeOf(this, ArgumentLengthException.prototype)
  }
}
