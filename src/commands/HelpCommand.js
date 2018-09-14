import BaseCommand from '../BaseCommand'

class HelpCommand extends BaseCommand {
  constructor ({ }) {
    super(...arguments)
  }

  shouldInvoke () {
    return this._command === 'help'
  }

  invoke () {
    this.reply(
      '**R6Stats Bot Help**' +
      '```\n' +
      'Stats\n' +
      '   r6s stats <username> <platform> {general|ranked|casual}\n' +
      '   r6s rank <username> <platform> {region: ncsa|emea|apac} {season}\n' +
      '   r6s operator <username> <platform> <operator>\n' +
      'Other\n' +
      '   r6s randomop <role>\n' +
      '   r6s ping\n' +
      '   r6s invite\n' +
      '\n\n' +
      'Options in <...> are required. Options in {...} are optional.\n' +
      '```'
    )
  }
}


export default HelpCommand
