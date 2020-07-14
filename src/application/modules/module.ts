import { Constructor } from '../../types'
import { ValkordCommand, CommandSignatureArgumentType } from '../commands'
import { ValkordConfig } from '../config'

export abstract class ValkordModule<C extends ValkordConfig = ValkordConfig> {
  public abstract getName (): string

  public abstract getCommands (): Constructor<ValkordCommand>[]

  public abstract getArgumentTypes (): Constructor<CommandSignatureArgumentType>[]

  public abstract getConfig (): Constructor<C> | null
}
