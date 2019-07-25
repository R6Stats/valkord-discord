'use strict'

import { injectable } from 'inversify';

interface IEventHandler {
  setup (): void
}

@injectable()
class EventHandler implements IEventHandler {
  setup (): void {

  }
}

export { IEventHandler, EventHandler }
