class GenericArgument<T> {
  value: T
  length: number

  constructor (value: T, length: number = 1) {
    this.value = value
    this.length = length
  }
}
