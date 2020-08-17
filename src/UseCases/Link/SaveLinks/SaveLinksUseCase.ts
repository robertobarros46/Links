import { ILinkRepository } from "../../../repositories/ILinkRepository";
import { ISaveLinkRequestDTO } from "./SaveLinkDTO";
import { Link } from "../../../entities/Links";
import validateUrl from "valid-url";
import puppeteer from "puppeteer";

let linksStatus = {};

export class SaveLinksUseCase {
  constructor(private linksRepository: ILinkRepository) {}

  async saveLinks(url: string, level: number): Promise<Link[]> {
    const links: Link[] = [];

    if (level === 0) {
      return links;
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const linkHrefs = await page.evaluate(() => {
      const results = [];
      let aLinks = document.querySelectorAll("a");
      let links = document.querySelectorAll("link");
      aLinks.forEach((alink) => results.push(alink.href));
      links.forEach((link) => results.push(link.href));
      return results;
    });

    for (let i = 0; i < linkHrefs.length; i++) {
      const url = linkHrefs[i];
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
