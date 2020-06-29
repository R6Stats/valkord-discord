import { Constructor } from '../../types'
import { Logger, LogLevel } from '../../utils/logger'

export class Container {
  private readonly logger = new Logger(Container.name, LogLevel.INFO)
  private readonly services: Map<Constructor<any>, any>

  private booted: boolean = false

  public constructor () {
    this.services = new Map()

    this.services.set(Container, this)
  }

  public resolve <T>(service: Constructor<any>): T {
    const existingInstance = this.services.get(service)

    // this.logger.log('[Container]', service)
    this.logger.debug(`Resolving ${service?.name}`)

    if (existingInstance) {
      this.logger.debug(`Resolved ${service?.name}`)

      return existingInstance
    }

    const tokens = Reflect.getMetadata('design:paramtypes', service) || []
    this.logger.debug(`Making ${service?.name}\n\t=> `, tokens.map(t => t?.name).join(', '))
    const injections = tokens.map((token: Constructor<any>) => this.resolve<any>(token))

    const newInstance = new service(...injections)

    if (this.booted && typeof newInstance.boot === 'function') {
      this.logger.debug(`Booting ${newInstance.constructor.name}`)
      newInstance.boot()
    }

    this.services.set(service, newInstance)

    return newInstance

  }

  public bootModules (): void {
    this.booted = true

    const services = Array.from(this.services.values())

    for (const service of services) {
      if (typeof service.boot === 'function') {
        this.logger.debug(`Booting ${service.constructor.name}`)
        service.boot()
      }
    }
  }
}

export interface OnModuleBoot {
  boot (): void
}
