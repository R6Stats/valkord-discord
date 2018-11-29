const Discord = require('discord.js')

const manager = new Discord.ShardingManager('./bot.js')

manager.on('launch', shard => console.log(`- Spawned shard ${shard.id} -`))

manager.spawn(2)
