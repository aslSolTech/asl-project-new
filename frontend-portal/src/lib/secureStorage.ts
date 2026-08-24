import { StateStorage } from "zustand/middleware";
import { logger } from "./logger";

const STORAGE_PREFIX = "pz_sec_";
const SECRET_SALT = 0x5a;

function encodeData(data: string): string {
  try {
    const textBytes = new TextEncoder().encode(data);
    const obfuscated = new Uint8Array(textBytes.length);
    for (let i = 0; i < textBytes.length; i++) {
      obfuscated[i] = textBytes[i] ^ SECRET_SALT;
    }
    let binary = "";
    for (let i = 0; i < obfuscated.byteLength; i++) {
      binary += String.fromCodePoint(obfuscated[i]);
    }
    return btoa(binary);
  } catch {
    return btoa(encodeURIComponent(data));
  }
}

function decodeData(encoded: string): string | null {
  try {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = (binary.codePointAt(i) ?? 0) ^ SECRET_SALT;
    }
    return new TextDecoder().decode(bytes);
  } catch {
    try {
      return decodeURIComponent(atob(encoded));
    } catch {
      return null;
    }
  }
}

export const secureZustandStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(`${STORAGE_PREFIX}${name}`);
      if (!raw) return null;
      return decodeData(raw);
    } catch (e) {
      logger.error(`[SecureStorage] Error reading ${name}:`, e);
      return null;
    }
  },

  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    try {
      const encoded = encodeData(value);
      localStorage.setItem(`${STORAGE_PREFIX}${name}`, encoded);
    } catch (e) {
      logger.error(`[SecureStorage] Error writing ${name}:`, e);
    }
  },

  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${name}`);
    } catch (e) {
      logger.error(`[SecureStorage] Error removing ${name}:`, e);
    }
  },
};
