import { EventHandler } from './EventHandler'
import { Client } from 'discord.js'
import { ServiceTypes } from '../types'
import { inject, injectable } from 'inversify'

@injectable()
class ErrorHandler extends EventHandler {
  private client: Client;

  public constructor (
    @inject(ServiceTypes.DiscordClient) client: Client
  ) {
    super()

    this.client = client
  }

  public setup (): void {
    this.client.on('error', (err): void => this.handleError(err))
  }

  private handleError (e: Error): void {
    console.log(e)
  }
}

export default ErrorHandler
