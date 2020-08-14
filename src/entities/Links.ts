export class Link {
  public url: string;
  public level: number;
  public links: Link[];

  constructor(props: Link) {
    Object.assign(this, props);
  }
}
