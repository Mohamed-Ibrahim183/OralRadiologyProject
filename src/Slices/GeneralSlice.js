import { axiosMethods } from "../Pages/Controller";

const methods = new axiosMethods();
export const serverURL = "http://localhost/Projects/OralRadiology/";

export function userLogin(data) {
  return methods.post(serverURL + "userLogic.php/Login", data);
}
