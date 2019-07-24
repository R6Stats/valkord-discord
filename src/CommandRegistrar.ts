'use strict'

import container from '../inversify.config'
import { injectable } from 'inversify'

import * as fs from 'fs'
import * as path from 'path'

import { BotCommand } from './BotCommand'

@injectable()
class CommandRegistrar {
  private commands: BotCommand[] = []

  public registerCommand (cmd: BotCommand) {
    container.bind<BotCommand>(cmd).toSelf()

    this.commands.push(cmd)

    console.log(`Registered command ${cmd.name}...`)
  }

  public bootCommands () {
    console.log(container)
    const cmds = container.get<BotCommand>(BotCommand)

    for (const cmd of cmds) {
      if (!cmd.isBooted()) cmd.boot()
    }
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
