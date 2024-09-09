import { axiosMethods } from "../Pages/Controller";
import { serverURL } from "./GeneralSlice";

const methods = new axiosMethods();

export function getAllAssignmentsData() {
  return methods.get(serverURL + "AssignmentLogic.php/GetAll");
}

export function getAllCategoriesData() {
  return methods.get(serverURL + "AssignmentLogic.php/GetCategories");
}
export function addCategory(data) {
  return methods.post(serverURL + "AssignmentLogic.php/addCategory", data);
}

export function getAssignmentsGroupsShow() {
  return methods.get(serverURL + "AssignmentLogic.php/AssignmentGroupsShow");
}

export function deleteAssignmentDB(assignmentId) {
  return methods.post(serverURL + "AssignmentLogic.php/DeleteAssignment", {
    assignmentId,
  });
}

export function insertNewAssignment(data) {
  return methods.post(serverURL + "AssignmentLogic.php/InsertAssignment", data);
}

export function addNewAssignmentSlot(data) {
  return methods.post(serverURL + "AssignmentLogic.php/AssignmentGroup", data);
}

export function getGroupsNamesDB() {
  return methods.get(serverURL + "GroupLogic.php/getGroupsNames");
}

export function getTotalUsersType(Type) {
  return methods.post(serverURL + "userLogic.php/GetTotalUsersType", { Type });
}
export function getSubmissionByAssignment(assignmentId) {
  return methods.get(
    serverURL + "AssignmentLogic.php/GetSubmissionAssignment",
    { assignmentId: assignmentId }
  );
}

export function getAssignmentImages(data) {
  return methods.get(
    serverURL + "AssignmentLogic.php/FetchAssignmentImages",
    data
  );
}

export function evaluateAssignmentImage(data) {
  return methods.post(serverURL + "AssignmentLogic.php/EvaluateImage", data);
}

export function getProfessorReport() {
  return methods.get(
    serverURL + "AssignmentLogic.php/GetAssignmentSubmissionReport"
  );
}
export function editCategory(categoryId, newName) {
  return methods.post(serverURL + "AssignmentLogic.php/EditCategory", {
    categoryId,
    newName,
  });
}

export function deleteCategory(categoryId) {
  return methods.get(serverURL + "AssignmentLogic.php/DeleteCategory", {
    Id: categoryId,
  });
}
