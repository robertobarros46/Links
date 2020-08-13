import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";

const router = Router();

router.post("/links", (request, response) => {
  return createUserController.handle(request, response);
});

router.get("/links", (request, response) => {
  return createUserController.handle(request, response);
});

export { router };
