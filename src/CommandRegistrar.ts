'use strict'

import container from '../inversify.config'
import { injectable } from 'inversify'

import * as fs from 'fs'
import * as path from 'path'

import BaseCommand from './BaseCommand'

@injectable()
class CommandRegistrar {
  private commands: typeof BaseCommand[] = []

  public registerCommand (cmd: typeof BaseCommand) {
    container.bind<BaseCommand>(cmd).toSelf()

    this.commands.push(cmd)

    console.log(`Registered command ${cmd.name}...`)
  }

  public async registerDirectory (dir: string) {
    const basePath = path.join(__dirname, dir)
    const files = fs.readdirSync(basePath)

    for (const file of files) {
      const { default: clazz } = await import(path.join(basePath, file))

      this.registerCommand(clazz)
    }
  }

  public getCommands () {
    return this.commands
  }

}

export default CommandRegistrar
