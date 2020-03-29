const Discord = require('discord.js')
const config = require('../config')
import * as path from 'path'

const { shards: shardList, total_shards: totalShards } = config.discord

const manager = new Discord.ShardingManager(path.join(__dirname, 'bot.js'), { shardList, totalShards })

manager.on('launch', shard => console.log(`- Spawned shard ${shard.id} -`))

manager.spawn()
