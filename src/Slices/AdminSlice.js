import { axiosMethods } from "../Pages/Controller";
import { serverURL } from "./GeneralSlice";

const methods = new axiosMethods();

export async function getAllGroupsData() {
  return methods.get(serverURL + "GroupLogic.php/Groups");
}

export async function DeleteGroup(Id) {
  return methods.post(serverURL + `GroupLogic.php/Delete`, { id: Id });
}

export async function insertNewGroup(data) {
  return methods.post(serverURL + `GroupLogic.php/Insert`, data);
}

export function changeUserGroup(data) {
  // userId: GroupName // Array
  const url = serverURL + "GroupLogic.php/Changes";
  return methods.post(url, data);
}

export function getUsersOfType(Type) {
  const url = serverURL + `userLogic.php/UsersOfType`;
  return methods.get(url, { Type });
}

export function deleteUserFromDB(userId) {
  return methods.get(serverURL + "userLogic.php/Delete", { userId });
}

export function insertNewUser(data) {
  return methods.post(serverURL + "userLogic.php/Insert", data);
}

export function insertByMSAId(data) {
  return methods.post(serverURL + "userLogic.php/InsertMSAId", data);
}
