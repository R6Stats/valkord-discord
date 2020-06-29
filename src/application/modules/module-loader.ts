import { CommandRegistrar, ClientCommand } from '../../domain/commands'
import { Injectable } from '../container'
import * as path from 'path'
import * as fs from 'fs'
import { Logger } from '../../utils/logger'
import { ModuleMetadataException } from './exceptions/module-metadata.exception'
import { ModuleMetadata } from './module'
import { ModuleLoadException } from './exceptions/module-load.exception'

export const DEFAULT_COMMANDS_DIRECTORY = 'commands'

@Injectable()
export class ModuleLoader {
  private readonly commands: CommandRegistrar
  private readonly logger = new Logger(ModuleLoader.name)

  public constructor (commands: CommandRegistrar) {
    this.commands = commands
  }

  public async load (dir: string): Promise<void> {
    const modulePath = path.resolve(__dirname, '../../', dir)

    const files = fs.readdirSync(modulePath)

    const metadataFile = files.find(f => f.endsWith('.module.ts') || f.endsWith('.module.js'))
    const metadataPath = path.join(modulePath, metadataFile)

    if (!metadataFile) {
      throw new ModuleMetadataException(dir)
    }

    const metadata = await this.loadMetadata(metadataPath)

    const { name } = metadata

    if (!name) {
      throw new ModuleLoadException(dir)
    }

    this.logger.log(`Loading module ${name}`)

    const cmdPath = path.join(modulePath, DEFAULT_COMMANDS_DIRECTORY)
    const hasLoadableCmds = files.includes(DEFAULT_COMMANDS_DIRECTORY) && fs.lstatSync(cmdPath).isDirectory()

    if (hasLoadableCmds) {
      this.logger.log('Auto loading module commands...')
      await this.loadCommands(cmdPath)
      this.logger.log('Auto loaded module commands!')
    }
  }

  public async loadMetadata (file: string): Promise<ModuleMetadata | null> {
    const imports = await import(file)

    const keys = Object.keys(imports)
    for (const key of keys) {
      const imported = imports[key]
      const isModule = Reflect.hasMetadata('module', imported)

      if (!isModule) continue

      const metadata: ModuleMetadata = { name: null }
      const metadataKeys = Reflect.getMetadataKeys(imported).filter(k => k !== 'module')

      for (const mKey of metadataKeys) {
        metadata[mKey] = Reflect.getMetadata(mKey, imported)
      }

      return metadata
    }

    return null
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
