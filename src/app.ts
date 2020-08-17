import "dotenv/config";
import express from "express";
import { router } from "./routes";
import connect from "./database";

const app = express();

app.use(express.json());
app.use(router);

const db: string = process.env.MONGO_URL;

connect(db);

export { app };
