import 'reflect-metadata'
import { Container } from './application/container/container'
import { CopperClient } from './client'
import { CommandSignatureArgumentTypeString } from './application/commands'

const run = async () => {
  const container = new Container()

  const bot = container.resolve<CopperClient>(CopperClient)

  container.bootModules()

  await bot.setup()

  const handler = bot.getCommandRegistry()

  handler.registerArgumentType(CommandSignatureArgumentTypeString)

  const modules = bot.getModuleLoader()
  modules.load('./modules/r6stats')

  await bot.connect()
}

run()
