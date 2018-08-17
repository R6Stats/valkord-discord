class BaseCommand {
  constructor ({ message, args, command }) {
    this._message = message
    this._args = args
    this._command = command
  }
}


export default BaseCommand
