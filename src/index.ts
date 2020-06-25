import 'reflect-metadata'
import { Container } from './container'
import { CopperClient } from './client'

const run = async () => {
  const container = new Container()

  const bot = container.resolve<CopperClient>(CopperClient)

  container.init()

  await bot.setup()
  await bot.connect()
}

run()
