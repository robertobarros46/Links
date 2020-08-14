import express from "express";
import { router } from "./routes";
import connect from "./database";

const app = express();

app.use(express.json());
app.use(router);

const db: string = "mongodb://localhost:27017/links";

connect(db);

export { app };
