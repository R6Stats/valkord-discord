import BaseCommand from '../BaseCommand'

class StatsCommand extends BaseCommand {

  constructor ({ args: { username, platform, queue=null }}) {
    super(...arguments)

    this._username = username
    this._platform = platform
    this._queue = queue
  }

  shouldInvoke() {
    return this._command === 'stats'
  }

  invoke () {
    this._message.channel.send('test')
  }

}

export default StatsCommand
