import axios from "axios";

// const axiosMethods = {
//   get: axios.get(),
// }
// http://localhost/Projects/OralRadiology/
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
