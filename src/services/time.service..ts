import { Injectable } from '../application/container'

@Injectable()
export class TimeService {
  public getTime (): Date {
    return new Date()
  }
}
