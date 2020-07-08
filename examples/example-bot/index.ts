import { ValkordFactory } from '../../src'

export const run = async (): Promise<void> => {
  await ValkordFactory.createManaged('./client.ts')
}

run()
