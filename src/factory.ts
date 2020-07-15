import { CommandSignatureArgumentTypeString } from './application/commands'
import { Container } from './application/container'
import { ValkordClient } from './client'
import { ValkordManager } from './manager'
import { Constructor } from './types'

export const DEFAULT_ARGUMENT_TYPES = [
  CommandSignatureArgumentTypeString,
]

export class ValkordFactory {
  public static async create <T extends ValkordClient = ValkordClient>(base: Constructor<T>): Promise<ValkordClient> {
    const { client } = await this.createWithContainer(base)

    return client
  }

  public static async createManaged (path: string): Promise<ValkordManager> {
    const container = new Container()
    const manager = container.resolve<ValkordManager>(ValkordManager)

    await manager.launch(path)

    return manager
  }

  public static async createWithContainer <T extends ValkordClient = ValkordClient>(base: Constructor<T>): Promise<{ container: Container; client: ValkordClient }> {
    const container = new Container()

    const client = container.resolve<T>(base)

    container.bootModules()

    await client.setup()

    const handler = client.getCommandRegistry()

    handler.registerArgumentTypes(...DEFAULT_ARGUMENT_TYPES)

    return { container, client }
  }
}
