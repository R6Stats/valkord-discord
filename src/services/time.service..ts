import { Injectable } from '../decorators/injectable.decorator'

@Injectable()
export class TimeService {
  public getTime (): Date {
    return new Date()
  }
}
