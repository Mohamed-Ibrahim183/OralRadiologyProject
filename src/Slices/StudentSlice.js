import { axiosMethods } from "../Pages/Controller";

const methods = new axiosMethods();
const server = "http://localhost/Projects/OralRadiology/";

export function getAssignmentsForUser(data) {
  return methods.get(
    server + "AssignmentLogic.php/GetAssignmentsForUser",
    data
  );
}

export function getSubmissionById(data) {
  return methods.get(server + "AssignmentLogic.php/GetSubmissionById", data);
}

export function getAssignmentData(data) {
  return methods.get(server + "AssignmentLogic.php/fetchAssignment", data);
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
  return methods.get(
    server + "AssignmentLogic.php/GetSubmissionByUserAndAssignment",
    data
  );
}

export function getSubmissionForUserReport(data) {
  return methods.get(
    server + "AssignmentLogic.php/GetSubmissionForUserReport",
    data
  );
}
