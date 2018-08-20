import BaseCommand from '../BaseCommand'

class PingCommand extends BaseCommand {
  constructor ({ }) {
    super(...arguments)
  }

  shouldInvoke () {
    return this._command === 'ping'
  }

  invoke () {
    this.reply('Pong!')
  }
}


export default PingCommand
