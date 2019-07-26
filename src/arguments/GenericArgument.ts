class GenericArgument<T> {
  value: T
  length: number
  errorMessage: string

  constructor (value: T, length: number = 1, errorMessage: string = 'Could not parse argument') {
    this.value = value
    this.length = length
    this.errorMessage = errorMessage
  }
}

export default GenericArgument
