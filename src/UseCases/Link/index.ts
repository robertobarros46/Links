import { MongoLinkRepository } from "../../repositories/implementations/MongoLinkRepository";
import { SaveLinksUseCase } from "./SaveLinks/SaveLinksUseCase";
import { SaveLinksController } from "./SaveLinks/SaveLinksController";
import { GetLinksUseCase } from "./GetLinks/GetLinksUseCase";
import { GetinksController } from "./GetLinks/GetinksController";

const mongoLinkRepository = new MongoLinkRepository();

const saveLinksUseCase = new SaveLinksUseCase(mongoLinkRepository);

const saveLinksController = new SaveLinksController(saveLinksUseCase);

const getLinksUseCase = new GetLinksUseCase(mongoLinkRepository);

const getinksController = new GetinksController(getLinksUseCase);

export {
  getLinksUseCase,
  getinksController,
  saveLinksUseCase,
  saveLinksController,
};
