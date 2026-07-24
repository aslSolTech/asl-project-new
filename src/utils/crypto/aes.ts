import crypto from "node:crypto";
import { AES_KEY, AES_IV, AES_ALGO } from "../../config/dotenv/dotenv.js";

// Cache key & IV buffer allocation to prevent Garbage Collection & re-allocation per call
const keyBuffer: Buffer = Buffer.from(AES_KEY, "hex");
const defaultIvBuffer: Buffer = Buffer.from(AES_IV, "hex");
const algorithm: string = AES_ALGO;

// Encrypts data string using AES-GCM
export const encryptAES = (data: string): string => {
  if (!data) return "";
  const cipher = crypto.createCipheriv(algorithm, keyBuffer, defaultIvBuffer) as crypto.CipherGCM;

  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");
  return `${encrypted}:${authTag}`;
};

// Decrypts AES-GCM payload string

export const decryptAES = (data: string): string => {
  if (!data) return "";
  const [encryptedPart, authTagPart] = data.split(":");
  if (!encryptedPart || !authTagPart) {
    throw new Error("Invalid encrypted data payload: Missing authentication tag");
  }

  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, defaultIvBuffer) as crypto.DecipherGCM;
  decipher.setAuthTag(Buffer.from(authTagPart, "hex"));

  let decrypted = decipher.update(encryptedPart, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};
