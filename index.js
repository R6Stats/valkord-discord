const Discord = require('discord.js')
const config = require('./config')

const { shards: shardList, total_shards: totalShards } = config.discord

const manager = new Discord.ShardingManager('./bot.js', { shardList, totalShards })

manager.on('launch', shard => console.log(`- Spawned shard ${shard.id} -`))

manager.spawn()
