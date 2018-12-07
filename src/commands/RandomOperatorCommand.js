import BaseCommand from '../BaseCommand'


class RandomOperatorCommand extends BaseCommand {

  constructor ({ api }) {
    super(...arguments)
    this._api = api
  }

  shouldInvoke () {
    return (this._command === 'randomop' || this._command === 'randomoperator')
  }

  async invoke () {
    if (this._args.length < 1) {
      return this.reply('Usage: randomop <role (attacker or defender)>')
    }

    let { data: operators } = await this._api.call({
      method: 'get',
      url: '/database/operators'
    })

    let role
    switch (this._args[0].toLowerCase()) {
      case 'attacker':
      case 'atk':
        role = 'attacker'
        break
      case 'defender':
      case 'def':
        role = 'defender'
        break
      default:
        return this.reply('Role not recognized. Usage: randomop <role (attacker or defender)>')
    }

    operators = operators.filter(op => op.role === role || op.role === 'recruit')
    const random = operators[Math.random(Math.floor(Math.random() * operators.length))]

    const { name, images: { badge: badge_url } } = random

    this.reply({
      embed: {
        color: 3447003,
        title: 'Random Operator',
        fields: [
          {
            name: 'Chosen Operator',
            inline: true,
            value: '**Name**:' + name + '\n'
          }
        ],
        thumbnail: {
          url: badge_url
        },
      }
    })

  }
}

export default RandomOperatorCommand
