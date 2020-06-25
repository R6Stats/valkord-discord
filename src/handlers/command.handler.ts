import { Injectable } from '../decorators/injectable.decorator'
import { Message } from 'discord.js'
import { CopperClient } from '../client'
import { Container } from '../container'
import { Handler } from './handler'

@Injectable()
export class CommandHandler extends Handler {
  private readonly container: Container

  public constructor (container: Container) {
    super()

    this.container = container
  }

  public setup (): void {
    const client = this.container.resolve<CopperClient>(CopperClient).getClient()

    client.on('message', (message: Message) => this.handleMessage(message))
  }

  public handleMessage (message: Message): void {
    console.log(message)
  }
}
