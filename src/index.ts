import 'reflect-metadata'
import { Container } from './container'
import { CopperClient } from './client'
import { PingCommand } from './commands/ping.command'

const run = async () => {
  const container = new Container()

  const bot = container.resolve<CopperClient>(CopperClient)

  container.bootModules()

  await bot.setup()

  const handler = bot.getCommandHandler()
  handler.registerCommand(PingCommand)

  await bot.connect()
}

run()
