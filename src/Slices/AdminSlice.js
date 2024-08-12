import { axiosMethods } from "../Pages/Controller";

const methods = new axiosMethods();

export async function getAllGroupsData() {
  const url = "http://localhost/Projects/OralRadiology/GroupLogic.php/Groups";
  const res = await methods.get(url);
  return res.msg;
}

export async function DeleteGroup(Id) {
  const url = `http://localhost/Projects/OralRadiology/GroupLogic.php/Delete`;
  const res = await methods.post(url, { id: Id });
  return res.msg;
}

export async function insertNewGroup(data) {
  const url = `http://localhost/Projects/OralRadiology/GroupLogic.php/Insert`;
  const res = await methods.post(url, data);
  return res.msg;
}

export function changeUserGroup(data) {
  // userId: GroupName // Array
  const url = "http://localhost/Projects/OralRadiology/GroupLogic.php/Changes";
  return methods.post(url, data);
}

export function getUsersOfType(Type) {
  const url = `http://localhost/Projects/OralRadiology/userLogic.php/Users/${Type}`;
  return methods.get(url);
}

export function deleteUserFromDB(userId) {
  return methods.get(
    "http://localhost/Projects/OralRadiology/userLogic.php/Delete",
    { userId }
  );
}

export function insertNewUser(data) {
  return methods.post(
    "http://localhost/Projects/OralRadiology/userLogic.php/Insert",
    data
  );
}
