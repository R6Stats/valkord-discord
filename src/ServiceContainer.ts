import { injectable, Container } from 'inversify'


@injectable()
class ServiceContainer {
  instance: Container
  constructor (instance: Container) {
    this.instance = instance
  }

  get () {

  }
}

export default ServiceContainer
