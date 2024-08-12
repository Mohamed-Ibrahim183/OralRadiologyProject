import { axiosMethods } from "../Pages/Controller";

const methods = new axiosMethods();
const server = "http://localhost/Projects/OralRadiology/";

export function getAllAssignmentsData() {
  return methods.get(server + "AssignmentLogic.php/GetAll");
}

export function getAllCategoriesData() {
  return methods.get(server + "AssignmentLogic.php/GetCategories");
}
export function addCategory(data) {
  return methods.post(server + "AssignmentLogic.php/addCategory", data);
}

export function getAssignmentsGroupsShow() {
  return methods.get(server + "AssignmentLogic.php/AssignmentGroupsShow");
}

export function deleteAssignmentDB(assignmentId) {
  return methods.post(server + "AssignmentLogic.php/DeleteAssignment", {
    assignmentId,
  });
}

export function insertNewAssignment(data) {
  return methods.post(server + "AssignmentLogic.php/InsertAssignment", data);
}

export function addNewAssignmentSlot(data) {
  return methods.post(server + "AssignmentLogic.php/AssignmentGroup", data);
}

export function getGroupsNamesDB() {
  return methods.get(server + "GroupLogic.php/getGroupsNames");
}

export function getTotalUsersType(Type) {
  return methods.post(server + "userLogic.php/GetTotalUsersType", { Type });
}
export function getSubmissionByAssignment(data) {
  return methods.get(
    server + "AssignmentLogic.php/GetSubmissionAssignment",
    data
  );
}

export function getAssignmentImages(data) {
  return methods.get(
    server + "AssignmentLogic.php/FetchAssignmentImages",
    data
  );
}

export function evaluateAssignmentImage(data) {
  return methods.post(server + "AssignmentLogic.php/EvaluateImage", data);
}
