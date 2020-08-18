import { ISaveLinkRequestDTO } from "./SaveLinkDTO";
import validateUrl from "valid-url";
import puppeteer from "puppeteer";
import { ILinkSchema } from "../../../schemas/ILinkSchema";
import Link from "../../../schemas/implementations/Link";

let linksStatus = {};

export class SaveLinksUseCase {
  async saveLinks(url: string, level: number): Promise<ILinkSchema[]> {
    const links: ILinkSchema[] = [];

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
        links.push(<ILinkSchema>{
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

    const linkAlreadyExists = await Link.findOne({ url: url });

    if (linkAlreadyExists) {
      throw new Error("URL already searched!");
    }

    const links = await this.saveLinks(url, level);

    const link = <ILinkSchema>{ url, level, links };

    await Link.create(link);

    linksStatus = {};
  }
}
