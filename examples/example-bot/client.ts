import { ValkordClient, ValkordFactory } from '../../src'
import { ExampleModule } from '../example-module/example.module'

export class ExampleClient extends ValkordClient {}

export const run = async (): Promise<void> => {
  const { client } = await ValkordFactory.createWithContainer(ExampleClient)

  const loader = client.getModuleLoader()

  loader.load(ExampleModule)

  await client.connect()
}

run()
