import { Constructor } from '../../types'
import { ValkordCommand } from '../commands'

export interface ModuleMetadata {
  name: string
  commands: Constructor<ValkordCommand>
}

export abstract class ValkordModule<C = Record<string, any>> {
  public abstract getName (): string

  public abstract getCommands (): Constructor<ValkordCommand>[]

  public abstract loadConfig (): C
}
