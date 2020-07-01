import { Constructor } from '../../types'
import { ValkordCommand } from '../commands'
import { ValkordConfig } from '../config'

export abstract class ValkordModule<C extends ValkordConfig = ValkordConfig> {
  public abstract getName (): string

  public abstract getCommands (): Constructor<ValkordCommand>[]

  public abstract getConfig (): Constructor<C> | null
}
