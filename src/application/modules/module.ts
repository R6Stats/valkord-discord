import { Constructor } from '../../types'
import { ClientCommand } from '../commands'

export interface ModuleMetadata {
  name: string
  commands: Constructor<ClientCommand>
}

export abstract class ValkordModule {
  public abstract getName (): string

  public abstract getCommands (): Constructor<ClientCommand>[]
}
