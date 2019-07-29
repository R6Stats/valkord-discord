interface IProvider {
  boot (): void;
  register (): void;
}

class Provider implements IProvider {
  public boot (): void {

  }

  public register (): void {

  }
}

export { IProvider, Provider }
