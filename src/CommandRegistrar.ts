import chalk from 'chalk'
import * as fs from 'fs'
import { injectable } from 'inversify'
import * as path from 'path'
import container from '../inversify.config'
import { BotCommand, IBotCommand } from './BotCommand'
import GenericRegistrar from './GenericRegistrar'
import { ServiceTypes } from './types'

@injectable()
class CommandRegistrar implements GenericRegistrar<new () => BotCommand> {
  public registry: any[];

  public register (cmd: new () => BotCommand): void {
    container.bind<IBotCommand>(ServiceTypes.Command).to(cmd)

    console.log(chalk.green(`Registered command ${cmd.name}!`))
  }

  public unregister (): void {
    throw new Error('Method not implemented.')
  }

  public bootAll (): void {
    const cmds = container.getAll<IBotCommand>(ServiceTypes.Command)
    cmds.forEach((c): void => c.boot())
  }

  public async registerDirectory (dir: string): Promise<void> {
    const basePath = path.join(__dirname, dir)
    const files = fs.readdirSync(basePath)

    for (const file of files) {
      const { default: clazz } = await import(path.join(basePath, file))

      this.register(clazz)
    }
  }
}

export default CommandRegistrar
