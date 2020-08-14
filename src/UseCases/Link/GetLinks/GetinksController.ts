import { Request, Response } from "express";
import { GetLinksUseCase } from "./GetLinksUseCase";

export class GetinksController {
  constructor(private searchLinksUseCase: GetLinksUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const links = await this.searchLinksUseCase.execute();
      return response.status(200).json(links);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
