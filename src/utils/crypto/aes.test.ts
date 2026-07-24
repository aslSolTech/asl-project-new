import { describe, it, expect } from 'vitest';
import { encryptAES, decryptAES } from './aes.js';

describe('AES-256-GCM Encryption / Decryption Module', () => {
  it('should encrypt string and decrypt it back to original plain text', () => {
    const originalText = 'SuperSecretFinTechPayload123!';
    const encrypted = encryptAES(originalText);

    expect(encrypted).toBeDefined();
    expect(encrypted).toContain(':');

    const decrypted = decryptAES(encrypted);
    expect(decrypted).toBe(originalText);
  });

  it('should throw an error for malformed ciphertext payload', () => {
    expect(() => decryptAES('invalid_ciphertext_without_authtag')).toThrowError(
      'Invalid encrypted data payload: Missing authentication tag'
    );
  });
});
