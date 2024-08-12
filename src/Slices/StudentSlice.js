import { axiosMethods } from "../Pages/Controller";

const methods = new axiosMethods();
const server = "http://localhost/Projects/OralRadiology/";

export function getAssignmentsForUser(data) {
  return methods.get(server + "AssignmentLogic.php", data);
}

export function getSubmissionById(data) {
  return methods.get(server + "AssignmentLogic.php");
}

export function getAssignmentData(data) {
  return methods.get(server + "AssignmentLogic.php", data);
}

export function makeNewSubmission(data) {
  return methods.post(server + "AssignmentLogic.php/newSubmission", data);
}

export function uploadNewAssignmentImage(data) {
  return methods.post(
    server + "AssignmentLogic.php/UploadAssignmentImage",
    data
  );
}

export function getSubmissionUserAssignment(data) {
  return methods.get(server + "AssignmentLogic.php", data);
}

export function getSubmissionForUserReport(data) {
  return methods.get(server + "AssignmentLogic.php", data);
}
