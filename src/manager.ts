import { ShardingManager } from 'discord.js'
import { ConfigLoader, DefaultValkordConfig } from './application/config'
import { Container, Injectable } from './application/container'
import { Logger } from './utils/logger'

@Injectable()
export class ValkordManager {
  private readonly container: Container
  private readonly config: ConfigLoader

  private readonly logger = new Logger(ValkordManager.name)

  public constructor (container: Container, config: ConfigLoader) {
    this.container = container
    this.config = config
  }

  public async launch (path: string): Promise<void> {
    const config = await this.config.load(DefaultValkordConfig)
    const shardRange = config.get('shard_range')
    const totalShards = config.get('total_shards')
    const [start, end] = shardRange.split('-').map(s => parseInt(s.trim()))
    const shardList = []

    for (let i = start; i <= end; i++) {
      shardList.push(i)
    }

    const manager = new ShardingManager(path, { shardList, totalShards, execArgv: ['-r', 'ts-node/register'] })

    manager.on('shardCreate', shard => this.logger.log(`Spawned shard ${shard.id}!`))

    manager.spawn(totalShards, 5500, -1)
    this.container.instance(ShardingManager, manager)
  }
}
