const Discord = require('discord.js')
const config = require('../config')
import * as path from 'path'

const { shard_list: shardList, total_shards: totalShards } = config.discord

const manager = new Discord.ShardingManager(path.join(__dirname, 'bot.js'), { shardList, totalShards })

manager.on('shardCreate', shard => console.log(`- Spawned shard ${shard.id} -`))

manager.spawn(totalShards, 5500, -1)
