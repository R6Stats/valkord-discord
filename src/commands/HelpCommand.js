import BaseCommand from '../BaseCommand'

class HelpCommand extends BaseCommand {
  constructor ({ }) {
    super(...arguments)
  }

  shouldInvoke () {
    return this._command === 'help'
  }

  invoke () {
    this.reply({
      embed: {
        color: 3447003,
        title: 'R6Stats Bot Help',
        description: 'Options in <...> are required. Options in {...} are optional.',
        thumbnail: {
          url: 'https://r6stats.com/img/logos/r6stats-100.png',
        },
        fields: [
          {
            name: 'Stats',
            inline: true,
            value: '**Generic Stats**: r6s stats <username> <platform> {general|ranked|casual}\n' +
              '**Seasonal/Rank Stats**: r6s rank <username> <platform> {region: ncsa|na|emea|eu|apac|asia} {season}\n' +
              '**Operator Stats**: r6s operator <username> <platform> <operator>'
          },
          {
            name: 'Other',
            inline: true,
            value: '**Random Operator**: r6s randomop <role>\n' +
              '**Ping**: r6s ping\n' +
              '**Invite Link**: r6s invite'
          }
        ],
        footer: {
          icon_url: 'https://r6stats.com/img/logos/r6stats-100.png',
          text: 'Bot provided by R6Stats.com',
          url: 'https://r6stats.com'
        }
      }
    })
  }
}


export default HelpCommand
