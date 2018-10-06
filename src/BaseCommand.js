class BaseCommand {
  constructor ({ message, args, command }) {
    this._message = message
    this._args = args
    this._command = command
  }

  reply (msg) {
    return this._message.channel.send(msg)
  }
}


export default BaseCommand
