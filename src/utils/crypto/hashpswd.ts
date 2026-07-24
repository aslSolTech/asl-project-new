import { hash, verify } from "argon2";

// Hash a password using Argon2id algorithm
export async function hashPassword(password: string): Promise<string> {
  return await hash(password);
}

// Verify a password against its hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await verify(hash, password);
}