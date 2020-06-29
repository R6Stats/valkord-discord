import 'reflect-metadata'
import { Container } from './application/container/container'
import { CopperClient } from './client'
import { HelpCommand } from './commands/help.command'
import { InviteCommand } from './commands/invite.command'
import { OperatorStatsCommand } from './commands/operator-stats.command'
import { PingCommand } from './commands/ping.command'
import { StatsCommand } from './commands/stats.command'
import { CommandSignatureArgumentTypeString } from './domain/commands'

const run = async () => {
  const container = new Container()

  const bot = container.resolve<CopperClient>(CopperClient)

  container.bootModules()

  await bot.setup()

  const handler = bot.getCommandRegistry()

  handler.registerArgumentType(CommandSignatureArgumentTypeString)

  handler.registerCommand(StatsCommand)
  handler.registerCommand(OperatorStatsCommand)
  handler.registerCommand(InviteCommand)
  handler.registerCommand(PingCommand)
  handler.registerCommand(HelpCommand)

  await bot.connect()
}

run()
