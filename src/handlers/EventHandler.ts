import { injectable } from 'inversify'

interface IEventHandler {
  setup (): void;
}

@injectable()
class EventHandler implements IEventHandler {
  public setup (): void {

  }
}

export { IEventHandler, EventHandler }
