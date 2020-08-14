import mongoose, { Schema } from "mongoose";
import { ILinkSchema } from "./ILinkSchema";

const LinkSchema: Schema = new Schema({
  url: { type: String, required: true },
  level: { type: String, required: true },
  links: { type: [Schema.Types.Mixed], required: true },
});

const Link = mongoose.model<ILinkSchema>("Link", LinkSchema);
export default Link;
