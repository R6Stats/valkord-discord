import { ClientException } from './client.exception'

export class MissingArgumentException extends ClientException {
  public readonly argument: string

  public constructor (argument: string, message: string = `The ${argument} argument is required!`) {
    super(message)

    this.argument = argument

    Object.setPrototypeOf(this, MissingArgumentException.prototype)
  }

  public getArgument (): string {
    return this.argument
  }
}
