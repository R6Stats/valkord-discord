import { Constructor } from './types'

export class Container {
  private readonly services: Map<Constructor<any>, any>

  private booted: boolean = false

  public constructor () {
    this.services = new Map()

    this.services.set(Container, this)
  }

  public resolve <T>(service: Constructor<any>): T {
    const existingInstance = this.services.get(service)

    // console.log('[Container]', service)
    console.log(`[Container] Resolving ${service?.name}`)

    if (existingInstance) {
      console.log(`[Container] Resolved ${service?.name}`)

      return existingInstance
    }

    const tokens = Reflect.getMetadata('design:paramtypes', service) || []
    console.log(`[Container] Making ${service?.name}\n\t=> `, tokens.map(t => t?.name).join(', '))
    const injections = tokens.map((token: Constructor<any>) => this.resolve<any>(token))

    const newInstance = new service(...injections)

    if (this.booted && typeof newInstance.boot === 'function') {
      console.log(`[Container] Booting ${newInstance.constructor.name}`)
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
        console.log(`[Container] Booting ${service.constructor.name}`)
        service.boot()
      }
    }
  }
}

export interface OnModuleBoot {
  boot (): void
}
