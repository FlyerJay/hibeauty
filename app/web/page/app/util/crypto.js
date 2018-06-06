import CryptoJS from 'crypto-js';

// aes加密
export function aesEncrypt(text) {
  const key = CryptoJS.enc.Utf8.parse('hibeauty');
  const encryptResult = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
  return encryptResult;
}

// aes解密
export function pureDecrypt(text) {
  const key = CryptoJS.enc.Utf8.parse('hibeauty');
  const decryptResult = CryptoJS.AES.decrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
  return decryptResult;
}

