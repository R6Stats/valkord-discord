import { CommandRegistrar, ClientCommand } from '../commands'
import { Injectable, Container } from '../container'
import * as path from 'path'
import * as fs from 'fs'
import { Logger } from '../../utils/logger'
import { ValkordModule } from './module'
import { Constructor } from '../../types'

export const DEFAULT_COMMANDS_DIRECTORY = 'commands'

@Injectable()
export class ModuleLoader {
  private readonly commands: CommandRegistrar
  private readonly container: Container

  private readonly logger = new Logger(ModuleLoader.name)

  public constructor (commands: CommandRegistrar, container: Container) {
    this.commands = commands
    this.container = container
  }

  public async load (module: Constructor<ValkordModule>): Promise<void> {
    const instance = this.container.resolve<ValkordModule>(module)

    const name = instance.getName()
    const commands = instance.getCommands()

    this.logger.log(`Loading module ${name}...`)

    for (const command of commands) {
      this.commands.registerCommand(command)
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

        if (exp.prototype instanceof ClientCommand) {
          this.commands.registerCommand(exp)
        }
      }
    }
  }
}
