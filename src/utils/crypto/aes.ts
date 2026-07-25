import crypto from "node:crypto";
import { AES_KEY, AES_IV, AES_ALGO } from "../../config/dotenv/dotenv.js";

export interface EncryptOptions {
  data: string;
  iv?: string;
}

export interface DecryptOptions {
  data: string;
  authTag?: string;
  iv?: string;
}

// Pre-allocated Key & Default IV buffers
const keyBuffer: Buffer = Buffer.from(AES_KEY, "hex");
const defaultIvBuffer: Buffer = Buffer.from(AES_IV, "hex");
const algorithm: string = AES_ALGO || "aes-256-gcm";

// Encrypts a plain string using AES-GCM.
// Supports string input or EncryptOptions object.
// Returns formatted cipher string: "iv:encryptedData:authTag"
export const encryptAES = (input: string | EncryptOptions): string => {
  const data = typeof input === "string" ? input : input.data;
  if (!data) return "";

  const ivBuffer =
    typeof input === "object" && input.iv
      ? Buffer.from(input.iv, "hex")
      : crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer) as crypto.CipherGCM;

  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");
  const ivHex = ivBuffer.toString("hex");

  return `${ivHex}:${encrypted}:${authTag}`;
};

// Decrypts an AES-GCM encrypted payload string or options object.
// Supports formatted string ("iv:encryptedData:authTag" or legacy "encryptedData:authTag") or DecryptOptions object.
export const decryptAES = (input: string | DecryptOptions): string => {
  let ivHex: string;
  let encryptedHex: string;
  let authTagHex: string;

  if (typeof input === "string") {
    if (!input) return "";
    const parts = input.split(":");
    if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
      ivHex = parts[0];
      encryptedHex = parts[1];
      authTagHex = parts[2];
    } else if (parts.length === 2 && parts[0] && parts[1]) {
      // Backward-compatible fallback for legacy "encryptedData:authTag" using default IV
      ivHex = defaultIvBuffer.toString("hex");
      encryptedHex = parts[0];
      authTagHex = parts[1];
    } else {
      throw new Error("Invalid encrypted payload format. Expected 'iv:encrypted:authTag'");
    }
  } else {
    encryptedHex = input.data;
    authTagHex = input.authTag || "";
    ivHex = input.iv || defaultIvBuffer.toString("hex");
  }

  if (!encryptedHex || !authTagHex) {
    throw new Error("Invalid encrypted payload: Missing encrypted content or authentication tag");
  }

  const decipher = crypto.createDecipheriv(
    algorithm,
    keyBuffer,
    Buffer.from(ivHex, "hex")
  ) as crypto.DecipherGCM;

  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

  let decrypted = decipher.update(encryptedHex, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
};
