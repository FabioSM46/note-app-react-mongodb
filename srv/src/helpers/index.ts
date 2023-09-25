import crypto from "crypto";
import { envServerSchema } from "../serverEnvSchema";

const secret = envServerSchema.SECRET 
export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(secret)
    .digest("hex");
};
