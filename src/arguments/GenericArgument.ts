class GenericArgument<T> {
  public value: T
  public length: number
  public errorMessage: string

  public constructor (value: T, length: number = 1, errorMessage: string = 'Could not parse argument') {
    this.value = value
    this.length = length
    this.errorMessage = errorMessage
  }
}

export default GenericArgument
