import { ILinkRepository } from "../ILinkRepository";
import { Link } from "../../entities/Links";
import Links from "../../schemas/Links";

export class MongoLinkRepository implements ILinkRepository {
  async findAll(): Promise<Link[]> {
    const links = Links.find();
    return links;
  }

  async save(link: Link): Promise<void> {
    const links = new Links(link);
    links.save();
  }

  async findLinkByUrl(url: string): Promise<Link> {
    const link = Links.findOne({ url: url });
    return link;
  }
}
