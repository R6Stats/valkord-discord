import { CommandRegistrar, ValkordCommand } from '../commands'
import { Injectable, Container } from '../container'
import * as path from 'path'
import * as fs from 'fs'
import { Logger } from '../../utils/logger'
import { ValkordModule } from './module'
import { Constructor } from '../../types'
import { ConfigService } from '../config'

export const DEFAULT_COMMANDS_DIRECTORY = 'commands'

@Injectable()
export class ModuleLoader {
  private readonly commands: CommandRegistrar
  private readonly container: Container
  private readonly config: ConfigService

  private readonly logger = new Logger(ModuleLoader.name)

  public constructor (commands: CommandRegistrar, container: Container, config: ConfigService) {
    this.commands = commands
    this.container = container
    this.config = config
  }

  public async load (module: Constructor<ValkordModule>): Promise<void> {
    const instance = this.container.resolve<ValkordModule>(module)

    const name = instance.getName()
    const commands = instance.getCommands()
    const config = instance.loadConfig()

    this.logger.log(`Loading module ${name}...`)

    for (const command of commands) {
      this.commands.registerCommand(command)
    }

    for (const prop in config) {
      const value = config[prop]

      this.config.set(prop, value)
    }

    this.logger.log(`Loaded module ${name}!`)
  }

  public async loadCommands (dir: string): Promise<void> {
    const files = fs.readdirSync(dir)
    const commandFiles = files.filter(c => c.endsWith('.command.js') || c.endsWith('.command.ts'))

    for (const file of commandFiles) {
      const exports = await import(path.join(dir, file))

      const keys = Object.keys(exports)
      for (const key of keys) {
        const exp = exports[key]

        if (exp.prototype instanceof ValkordCommand) {
          this.commands.registerCommand(exp)
        }
      }
    }
  }
}
