import { OnModuleBoot } from '../application/container/container'

export abstract class Handler implements OnModuleBoot {
  abstract setup (): void

  public boot (): void {
    this.setup()
  }
}
