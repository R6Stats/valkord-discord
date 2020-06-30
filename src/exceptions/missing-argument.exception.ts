import { ClientException } from './client.exception'

export class MissingArgumentException extends ClientException {
  private readonly argument: string

  public constructor (argument: string) {
    super(`The ${argument} argument is required!`)

    this.argument = argument

    Object.setPrototypeOf(this, MissingArgumentException.prototype)
  }

  public getArgument (): string {
    return this.argument
  }
}
