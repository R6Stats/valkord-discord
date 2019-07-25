'use strict'

import container from '../inversify.config'
import { injectable } from 'inversify'
import chalk from 'chalk'

import * as fs from 'fs'
import * as path from 'path'

import { IBotCommand, BotCommand } from './BotCommand'
import GenericRegistrar from './GenericRegistrar';
import { ServiceTypes } from './types';

@injectable()
class CommandRegistrar implements GenericRegistrar<new () => BotCommand> {
  registry: any[];

  public register (cmd: new () => BotCommand) {
    container.bind<IBotCommand>(ServiceTypes.Command).to(cmd)

    console.log(chalk.green(`Registered command ${cmd.name}!`))
  }

  unregister(cmd: new () => BotCommand): void {
    throw new Error('Method not implemented.');
  }

  public async registerDirectory (dir: string) {
    const basePath = path.join(__dirname, dir)
    const files = fs.readdirSync(basePath)

    for (const file of files) {
      const { default: clazz } = await import(path.join(basePath, file))

      this.register(clazz)
    }
  }

}

export default CommandRegistrar
