import { axiosMethods } from "../Pages/Controller";
import { serverURL } from "./GeneralSlice";

const methods = new axiosMethods();

export function getAssignmentsForUser(data) {
  return methods.get(
    serverURL + "AssignmentLogic.php/GetAssignmentsForUser",
    data
  );
}

export function getSubmissionById(data) {
  return methods.get(serverURL + "AssignmentLogic.php/GetSubmissionById", data);
}

export function getAssignmentData(data) {
  return methods.get(serverURL + "AssignmentLogic.php/fetchAssignment", data);
}

export function makeNewSubmission(data) {
  return methods.post(serverURL + "AssignmentLogic.php/newSubmission", data);
}

export function uploadNewAssignmentImage(data) {
  return methods.post(
    serverURL + "AssignmentLogic.php/UploadAssignmentImage",
    data
  );
}

export function getSubmissionUserAssignment(data) {
  return methods.get(
    serverURL + "AssignmentLogic.php/GetSubmissionByUserAndAssignment",
    data
  );
}
export function getSubmissionUserAssignmentWeek(data) {
  return methods.get(
    serverURL + "AssignmentLogic.php/getSubmissionUserAssignmentWeek",
    data
  );
}
export function getSubmittedAssignmentCategories(data) {
  return methods.get(
    serverURL + "AssignmentLogic.php/getSubmittedAssignmentCategories",
    data
  );
}
export function getSubmissionForUserReport(StudentId) {
  return methods.get(
    serverURL + "AssignmentLogic.php/GetSubmissionForUserReport",
    { StudentId }
  );
}

export function studentReport(studentId) {
  return methods.get(
    serverURL + "AssignmentLogic.php/GetAssignmentSubmissionStudentReport",
    { Id: studentId }
  );
}

export function getBestGrade(studentId, assignmentId) {
  // this endPoint will return Array[Total:number, count:Number] or -1 if there is not submissions for this student at this assignment
  return methods.get(
    serverURL + "AssignmentLogic.php/getBestGradeStudentAssignment",
    {
      assignmentId,
      studentId,
    }
  );
}
