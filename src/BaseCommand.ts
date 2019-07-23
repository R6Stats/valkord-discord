import { injectable } from 'inversify'
import MessageContext from './MessageContext'

@injectable()
abstract class BaseCommand {
  abstract shouldInvoke(ctx: MessageContext): boolean
  abstract invoke(ctx: MessageContext): void
}

export default BaseCommand
