export class Logger {
  private readonly name: string | null

  private readonly level: LogLevel

  public constructor (name: string = null, level: LogLevel = LogLevel.INFO) {
    this.name = name
    this.level = level
  }

  get prefix (): string {
    return this.name ? `[${this.name}]` : null
  }

  public log (...message: unknown[]): void {
    return console.log(this.prefix, ...message)
  }

  public debug (...message: unknown[]): void {
    if (this.level > LogLevel.DEBUG) return

    return this.log(...message)
  }

  public warn (...message: unknown[]): void {
    return this.log(...message)
  }
}

export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}
