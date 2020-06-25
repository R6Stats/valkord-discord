import { Constructor } from '../types'

export const Injectable = (): (target: Constructor<any>) => void => {
  return (target: Constructor<any>) => {
    //
  }
}
