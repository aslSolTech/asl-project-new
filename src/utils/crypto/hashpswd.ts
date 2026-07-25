import { hash, verify } from "argon2";

interface HashPasswordProps {
  password: string;
}

interface VerifyPasswordProps {
  password: string;
  hash: string;
}

// Hash a password using Argon2id algorithm
export async function hashPassword({ password }: HashPasswordProps): Promise<string> {
  return await hash(password);
}

// Verify a password against its hash
export async function verifyPassword({ password, hash }: VerifyPasswordProps): Promise<boolean> {
  return await verify(hash, password);
}