import CryptoJS from "crypto-js";
import axios from "axios";

export function validArray(array) {
  return Array.isArray(array) && array.length > 0;
}
// const SECRET_KEY = "Abo_el_Mana3eeeeeeeem343rfetvrfdncy54erncgfd";
// const SECRET_KEY = "IIIIHelloWorldThisIsMonemAndMohamedSecretKeyIIII";
export function removeSessionKey(key, hashKey = false) {
  if (hashKey) sessionStorage.removeItem(encryptData(key));
  else sessionStorage.removeItem(key);
}
export function getSession(key, hashKey = false) {
  const sessionValue = hashKey
    ? sessionStorage.getItem(encryptData(key) ?? "")
    : sessionStorage.getItem(key) ?? "";

  if (sessionValue) return decryptData(sessionValue); // Add return here

  return null; // Return null if no value is found
  // return sessionStorage.getItem(key) ?? "";
}

export function setSession(key, value, hashKey = false) {
  const encryptedValue = encryptData(value ?? "");
  // console.log("Encrypted Value:", encryptedValue);

  if (hashKey) {
    const encryptedKey = encryptData(key ?? "");
    // console.log("Encrypted Key:", encryptedKey);
    sessionStorage.setItem(encryptedKey, encryptedValue);
  } else {
    sessionStorage.setItem(key, encryptedValue);
  }
  // sessionStorage.setItem(key, value);
}

// Helper functions
export const encryptData = (
  data,
  key = "IIIIHelloWorldThisIsMonemAndMohamedSecretKeyIIII"
) => CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
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

class axiosMethods {
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
class DBMethods {
  constructor() {
    this.API = new axiosMethods();
  }
  // getAllGroupsData() {
  //   const url = "http://localhost/Projects/OralRadiology/GroupLogic.php/Groups";
  //   return this.API.get(url).then((res) => res.msg);
  // }
  // getType(type) {
  //   const url = `http://localhost/Projects/OralRadiology/userLogic.php/Users/${type}`;
  //   return this.API.get(url);
  // }
}

// export default Controller;
export { axiosMethods, DBMethods };
