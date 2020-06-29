import { ClientException } from '../../../exceptions/client.exception'

export class ModuleMetadataException extends ClientException {
  public constructor (dir: string) {
    super(`Could not find metadata for plugin at ${dir}`)
  }
}
