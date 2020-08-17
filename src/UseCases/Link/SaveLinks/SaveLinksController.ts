import { Request, Response } from "express";
import { SaveLinksUseCase } from "./SaveLinksUseCase";

export class SaveLinksController {
  constructor(private searchLinksUseCase: SaveLinksUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { url, level } = request.body;

    try {
      await this.searchLinksUseCase.execute({
        url,
        level,
      });

      return response.status(201).json({
        message: "Links crawled with success",
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
