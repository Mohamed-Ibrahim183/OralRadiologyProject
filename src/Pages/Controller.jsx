import CryptoJS from "crypto-js";
import axios from "axios";

export function validArray(array) {
  return Array.isArray(array) && array.length > 0;
}
// Encrypt the data with a given secret key
export const encryptData = (
  data,
  key = "IIIIHelloWorldThisIsMonemAndMohamedSecretKeyIIII"
) => CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();

// Decrypt the data with a given secret key
export const decryptData = (
  encryptedData,
  key = "IIIIHelloWorldThisIsMonemAndMohamedSecretKeyIIII"
) => {
  if (!encryptedData || encryptedData === "") {
    console.error("Encrypted data is empty or undefined.");
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedData) {
      console.error("Decryption failed or returned an empty result.");
      return null;
    }
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};

// Use hashed key for session storage if hashKey is true
export function setSession(key, value, hashKey = true) {
  const encryptedValue = encryptData(value ?? "");

  if (hashKey) {
    // Encrypt the key ONCE before using it
    const hashedKey = CryptoJS.SHA256(key).toString(); // Use a hash function like SHA-256
    sessionStorage.setItem(hashedKey, encryptedValue); // Store the hashed key with encrypted value
  } else {
    sessionStorage.setItem(key, encryptedValue); // Store the plain key with encrypted value
  }
}

// Retrieve session value using hashed key if hashKey is true
export function getSession(key, hashKey = true) {
  let sessionValue;

  if (hashKey) {
    // Hash the key the same way as in setSession
    const hashedKey = CryptoJS.SHA256(key).toString();
    sessionValue = sessionStorage.getItem(hashedKey) ?? "";
  } else {
    sessionValue = sessionStorage.getItem(key) ?? "";
  }

  if (sessionValue) {
    return decryptData(sessionValue); // Decrypt the stored value
  }

  return null; // Return null if no value is found
}

// Remove session value using hashed key if hashKey is true
export function removeSessionKey(key, hashKey = true) {
  if (hashKey) {
    const hashedKey = CryptoJS.SHA256(key).toString(); // Hash the key same way
    sessionStorage.removeItem(hashedKey); // Remove the hashed key from sessionStorage
  } else {
    sessionStorage.removeItem(key); // Remove the plain key from sessionStorage
  }
}

// Helper functions

export class axiosMethods {
  get(url, params = {}) {
    return axios
      .get(url, { params })
      .then((res) => ({ msg: res.data, error: "" }))
      .catch((error) => ({ msg: "", error: error.message }));
  }

  post(url, data) {
    if (!(data instanceof FormData)) {
      let fData = new FormData();
      Object.keys(data).forEach((ele) => {
        fData.append(ele, data[ele]);
      });
      data = fData;
    }

    return axios
      .post(url, data)
      .then((res) => ({ msg: res.data, error: "" }))
      .catch((error) => ({ msg: "", error: error.message }));
  }

  put(url, data) {
    return axios
      .put(url, data)
      .then((res) => ({ msg: res.data, error: "" }))
      .catch((error) => ({ msg: "", error: error.message }));
  }

  delete(url, params = {}) {
    return axios
      .delete(url, { params })
      .then((res) => ({ msg: res.data, error: "" }))
      .catch((error) => ({ msg: "", error: error.message }));
  }
}
