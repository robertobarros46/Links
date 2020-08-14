import { ILinkRepository } from "../../../repositories/ILinkRepository";

export class GetLinksUseCase {
  constructor(private usersRepository: ILinkRepository) {}

  async execute() {
    const link = await this.usersRepository.findAll();
    return link;
  }
}
