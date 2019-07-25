'use strict'

interface IProvider {
  boot (): void

  register (): void
}

class Provider implements IProvider {
  boot (): void {

  }

  register (): void {

  }
}

export { IProvider, Provider }
