import { ValkordModule } from '../../src/application/modules'
import { PingCommand } from './commands/ping.command'
import { Constructor } from '../../src/types'
import { ValkordCommand, CommandSignatureArgumentType } from '../../src/application/commands'
import { ValkordConfig } from '../../src/application/config'
import { AnimalCommand } from './commands/animal.command'
import { CommandSignatureArgumentTypeAnimal } from './commands/argument-types/animal.argument-type'

export interface ExampleModuleConfigOptions {
}

export class ExampleModuleConfig extends ValkordConfig<ExampleModuleConfigOptions> {
  public load = (): ExampleModuleConfigOptions => ({
  })
}

export class ExampleModule extends ValkordModule<ExampleModuleConfig> {
  public getName = (): string => 'Example'

  public getConfig = (): Constructor<ExampleModuleConfig> => ExampleModuleConfig

  public getCommands = (): Constructor<ValkordCommand>[] => [
    PingCommand,
    AnimalCommand,
  ]

  public getArgumentTypes = (): Constructor<CommandSignatureArgumentType>[] => [
    CommandSignatureArgumentTypeAnimal,
  ]
}
