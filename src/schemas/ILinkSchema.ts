import { Document } from "mongoose";

export interface ILinkSchema extends Document {
  url: string;
  level: number;
  links: ILinkSchema[];
}
