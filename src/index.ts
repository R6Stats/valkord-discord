import 'reflect-metadata'
import { CopperClient } from './client'
import { PingCommand } from './commands/ping.command'
import { Container } from './container'
import { CommandSignatureArgumentTypeString } from './commands/command'

const run = async () => {
  const container = new Container()

  const bot = container.resolve<CopperClient>(CopperClient)

  container.bootModules()

  await bot.setup()

  const handler = bot.getCommandRegistry()

  handler.registerArgumentType(CommandSignatureArgumentTypeString)

  handler.registerCommand(PingCommand)

  await bot.connect()
}

run()
