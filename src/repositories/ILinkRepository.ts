import { Link } from "../entities/Links";

export interface ILinkRepository {
  findAll(): Promise<Link[]>;
  save(link: Link): Promise<void>;
  findLinkByUrl(url: string): Promise<Link>;
}
