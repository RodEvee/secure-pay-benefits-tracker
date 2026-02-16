
// Mocking encryption/decryption for local data privacy
const ENCRYPTION_KEY = 'secure-pay-local-key';

export const storageService = {
  encrypt: (data: any): string => {
    // In a real app, use WebCrypto API (AES-GCM)
    // Here we simulate it with Base64 encoding for the prototype
    const json = JSON.stringify(data);
    return btoa(unescape(encodeURIComponent(json)));
  },

  decrypt: (cipher: string): any => {
    try {
      const json = decodeURIComponent(escape(atob(cipher)));
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  },

  save: (key: string, data: any) => {
    const encrypted = storageService.encrypt(data);
    localStorage.setItem(key, encrypted);
  },

  load: (key: string): any => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return storageService.decrypt(data);
  }
};
