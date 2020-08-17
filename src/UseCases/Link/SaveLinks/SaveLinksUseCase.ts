import { ILinkRepository } from "../../../repositories/ILinkRepository";
import { ISaveLinkRequestDTO } from "./SaveLinkDTO";
import { Link } from "../../../entities/Links";
import api from "../../../client/api";
import validateUrl from "valid-url";
import cheerio from "cheerio";

let linksStatus = {};

export class SaveLinksUseCase {
  constructor(private linksRepository: ILinkRepository) {}

  async saveLinks(url: string, level: number): Promise<Link[]> {
    const links: Link[] = [];

    if (level === 0) {
      return links;
    }

    const resp = await api.get(url);

    const html = resp.data;
    const $ = cheerio.load(html);
    const linkObjects = $("a");
    const total = linkObjects.length;

    for (let i = 0; i < total; i++) {
      const url = linkObjects[i].attribs.href;
      if (validateUrl.isUri(url) && !linksStatus[url]) {
        linksStatus[url] = true;
        const linksLvl = await this.saveLinks(url, level - 1);
        links.push({
          url: url,
          level: level,
          links: linksLvl,
        });
      }
    }

    /**
     * If you want to make async and give a optimistic feedback to the customer we can use this approach
     */
    // api.get(url).then((resp) => {
    //   const html = resp.data;
    //   const $ = cheerio.load(html);
    //   const linkObjects = $("a");
    //   const total = linkObjects.length;

    //   for (let i = 0; i < total; i++) {
    //     const url = linkObjects[i].attribs.href;
    //     if (validateUrl.isUri(url)) {
    //       const linksLvl = this.saveLinks(url, level - 1);
    //       links.push({
    //         url: url,
    //         level: level,
    //         links: linksLvl,
    //       });
    //     }
    //   }
    // });
    return links;
  }

  async execute({ url, level }: ISaveLinkRequestDTO) {
    if (!validateUrl.isUri(url)) {
      throw new Error(
        "Not a correct url, please check if you're sending a correct one!"
      );
    }

    const linkAlreadyExists = await this.linksRepository.findLinkByUrl(url);

    if (linkAlreadyExists) {
      throw new Error("URL already searched!");
    }

    const links = await this.saveLinks(url, level);

    const link = new Link({ url, level, links });

    await this.linksRepository.save(link);

    linksStatus = {};
  }
}
