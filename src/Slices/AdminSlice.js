import { axiosMethods } from "../Pages/Controller";
import { serverURL } from "./GeneralSlice";
import emailjs from "@emailjs/browser";

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

export function getAllUsersDB() {
  return methods.get(serverURL + "userLogic.php/Users");
}
export function deleteUserFromDB(userId) {
  return methods.get(serverURL + "userLogic.php/Delete", { userId });
}
export function getAllGroupsNamesDB() {
  return methods.get(serverURL + "GroupLogic.php/getGroupsNames");
}
export function getUsersMails(groupId) {
  return methods.get(serverURL + "GroupLogic.php/UsersMails/" + groupId);
}
export function insertByMSAId(data) {
  return methods.post(serverURL + "userLogic.php/InsertMSAId", data);
}

export function sendMailAPI(toName, fromName, message, toEmail) {
  emailjs.send(
    "service_i5cp5yq",
    "template_r8ll4fg",
    {
      to_name: toName,
      from_name: fromName,
      message: message,
      to_Email: toEmail,
    },
    "p5suXG8zm4KIy7q0l"
  );
}
