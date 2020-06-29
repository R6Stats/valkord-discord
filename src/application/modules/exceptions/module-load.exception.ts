import { ClientException } from '../../../exceptions/client.exception'

export class ModuleLoadException extends ClientException {
  public constructor (dir: string) {
    super(`An error occurred while loading the module at ${dir}`)
  }
}
