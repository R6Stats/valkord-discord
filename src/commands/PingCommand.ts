import BaseCommand from '../BaseCommand'

class PingCommand extends BaseCommand {

  shouldInvoke () {
    return this.command === 'ping'
  }

  invoke () {
    this.reply('Pong!')
  }

}

export default PingCommand
