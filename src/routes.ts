import { Router } from "express";
import { saveLinksController, getinksController } from "./UseCases/Link";

const router = Router();

router.post("/links", (request, response) => {
  return saveLinksController.handle(request, response);
});

router.get("/links", (request, response) => {
  return getinksController.handle(request, response);
});

export { router };
