export class Logger {
  private readonly name: string | null

  public constructor (name: string = null) {
    this.name = name
  }

  get prefix (): string {
    return this.name ? `[${this.name}]` : null
  }

  public log (...message: unknown[]): void {
    return console.log(this.prefix, ...message)
  }
}
