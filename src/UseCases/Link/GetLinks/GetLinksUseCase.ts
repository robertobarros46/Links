import Link from "../../../schemas/implementations/Link";

export class GetLinksUseCase {
  async execute() {
    const link = await Link.find();
    return link;
  }
}
