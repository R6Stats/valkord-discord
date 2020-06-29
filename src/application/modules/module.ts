import { Constructor } from '../../types'

export interface ModuleMetadata {
  name: string
}

export function Module(metadata: ModuleMetadata) {
  return (target: Constructor<any>) => {
    Reflect.defineMetadata('module', true, target)

    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, metadata[property], target)
      }
    }
  }
}
