import { SaveLinksUseCase } from "./SaveLinks/SaveLinksUseCase";
import { SaveLinksController } from "./SaveLinks/SaveLinksController";
import { GetLinksUseCase } from "./GetLinks/GetLinksUseCase";
import { GetinksController } from "./GetLinks/GetinksController";

const saveLinksUseCase = new SaveLinksUseCase();

const saveLinksController = new SaveLinksController(saveLinksUseCase);

const getLinksUseCase = new GetLinksUseCase();

const getinksController = new GetinksController(getLinksUseCase);

export {
  getLinksUseCase,
  getinksController,
  saveLinksUseCase,
  saveLinksController,
};
