import { Document } from "mongoose";
import { Link } from "../entities/Links";

export interface ILinkSchema extends Document {
  url: string;
  level: number;
  links: Link[];
}
