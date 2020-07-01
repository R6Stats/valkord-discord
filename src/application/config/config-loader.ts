import * as dotenv from 'dotenv'
import { Constructor } from '../../types'
import { Container, Injectable } from '../container'
import { ValkordConfig } from './valkord-config'

dotenv.config()

@Injectable()
export class ConfigLoader {
  private readonly container: Container

  public constructor (container: Container) {
    this.container = container
  }

  public async load <T extends ValkordConfig<any>>(config: Constructor<T>): Promise<T> {
    const instance = this.container.resolve<T>(config)

    return instance
  }
}
