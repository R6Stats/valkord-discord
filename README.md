# Valkord (valk-discord)

[![Discord](https://discordapp.com/api/guilds/293848587391991836/embed.png)](https://discord.gg/pUdraS3)
[![npm (scoped)](https://img.shields.io/npm/v/@r6stats/valkord)](https://www.npmjs.com/package/@r6stats/valkord)
[![David](https://img.shields.io/david/r6stats/valkord-discord)](https://david-dm.org/r6stats/valkord-discord)
[![David](https://img.shields.io/david/peer/r6stats/valkord-discord)](https://david-dm.org/r6stats/valkord-discord)

Valkord is a micro framework for building Discord bots with [discordjs](https://discord.js.org/#/) and [TypeScript](https://www.typescriptlang.org/). Valkord uses a [Modular](https://en.wikipedia.org/wiki/Modular_design) component loading system, allowing you to develop or use 3rd party modules in your bot. Modules consist of commands, listeners and other classes that can be customized on a case-by-case basis.

## Installing

To use Valkord to develop your own bot, you'll need to install it in your project alongside discord.js.

```bash
npm install @r6stats/valkord discord.js --save
```

## Creating a Module

In order to create your own module, you'll want to extend the `ValkordModule` class and define the components that make up your module. You can also optionally add add a custom config for loading variables from the user's `.env` file.

```ts
// my.module.ts

import { ClientCommand, Constructor, ValkordModule } from '@r6stats/valkord'
import { MyModuleConfig } from './my.module-config'
import { PingCommand } from './commands'

export class MyModule extends ValkordModule<MyModuleConfig> {
  public getName = (): string => 'MyStuff'

  public getConfig = (): Constructor<MyModuleConfig> | null => MyModuleConfig // or return null

  public getCommands = (): Constructor<ClientCommand>[] => {
    PingCommand,
  }
}
```

```ts
// my.module-config.ts

import { ValkordConfig } from '@r6stats/valkord'

export interface MyModuleConfigOptions {
  my_config_value: string
}

export class MyModuleConfig extends ValkordConfig<MyModuleConfigOptions> {
  public load = (): MyModuleConfigOptions => ({
    my_config_value: env('MY_CONFIG_VALUE')
  })
}
```

```ts
// index.ts

export * from './my.module-config'
export * from './my.module'
```

The referenced command class makes use of the `ValkordCommand` class built into Valkord, which is extensible and allows for custom command handling as well as built in support for aliases, help messages and more.

```ts
import { ValkordCommand, CommandContext, Injectable } from '@r6stats/valkord'
import { Message } from 'discord.js'

@Injectable()
export class PingCommand extends ValkordCommand {
  public readonly command = 'ping'
  public readonly name = 'Ping'

  public async handle (ctx: CommandContext): Promise<Message | Message[] | void> {
    return ctx.reply('Pong!')
  }
}

```

Thanks to Valkord's incredibly simple [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) implementation, you can also create your own service (among others) classes that can auomatically be resolved from Valkord's built in container.

Take for example, the `TimeService` class:

```ts
import R6StatsAPI, { GenericStatsResponse, OperatorStatsResponse } from '@r6stats/node'
import { ConfigService, OnModuleBoot, Injectable } from '@r6stats/valkord'

@Injectable()
export class TimeService {
  public async getTime (): Promise<Date> {
    return new Date()
  }
}
```

You can now reference the `TimeService` from any class where the `@Injectable()` decorator is present, more importantly in the commands.

```ts
import { ValkordCommand, CommandContext, Injectable } from '@r6stats/valkord'
import { Message } from 'discord.js'

@Injectable()
export class TimeCommand extends ValkordCommand {
  public readonly command = 'time'
  public readonly name = 'Time'

  private readonly time: TimeService

  public constructor (time: TimeService) {
    this.time = time
  }

  public async handle (ctx: CommandContext): Promise<Message | Message[] | void> {
    return ctx.reply(this.time.getTime())
  }
}

```

## Creating a Deployable Bot

Regardless or whether or not you want to build your own modules, you'll have no problem running the bot in production.

You'll simply need to create a TypeScript or JavaScript file named `index.js` (or whatever you prefer) and instantiate your bot:

```ts
import { ValkordClient, ValkordFactory } from '@r6stats/valkord'

// optionally import your custom module, or any 3rd party modules
import MyModule from 'my-valkord-module'

export class MyClient extends ValkordClient {

}

const run = async () => {
  // instatiate the client from the Container
  const client = await ValkordFactory.create<MyClient>(MyClient)

  // load any modules of your choosing
  const loader = client.getModuleLoader()
  loader.load(MyModule)

  // connect!
  await client.connect()
}

run()

```
