// const baseUrl = "https://capstone-web-server-nabati.herokuapp.com/";
const baseUrl = "https://localhost/";
export const apiStore = {
  login: baseUrl + "login",
  getAllSpecializations: baseUrl + "specialization",
  getAllSubjects: baseUrl + "subject",
  getSubjectByID: baseUrl + "subject/byid/{id}?id=",
  getAllClass: baseUrl + "class",
  getScheduleByClassId: baseUrl + "schedule/byclassid?classId=",
  getAttendanceLogBySlotId: baseUrl + "attendance?id=",
  subjects: baseUrl + "subject",
  deleteSubject: baseUrl + "subject?subjectId=",
  getStudents: baseUrl + "account/students",
  updateProfile: baseUrl + "profile?accountId=",
  register: baseUrl + "register",
  addNewClass: baseUrl + "class/create",
  addStudentsToClass: baseUrl + "class/addstudent",
  addCourseToClass: baseUrl + "class/addcourse",
  getProfile: baseUrl + "profile",
  getClassById: baseUrl + "class/",
  getAllTeachers: baseUrl + "account/teachers",
  updateSchedule: baseUrl + "schedule?slotId=",
  importSchedule: baseUrl + "schedule/import",
  deleteSchedule: baseUrl + "schedule?id=",
  updateAttendanceLog: baseUrl + "attendance/update",
  getTotalInfo: baseUrl + "total",
  getOngoingClass: baseUrl + "class/ongoing",
  getSubjects: baseUrl + "subject",
  subject: baseUrl + "subject?subjectId=",
  getSpecs: baseUrl + "specialization",
  getSpecById: baseUrl + "specialization/{id}?id=",
  getTeachers: baseUrl + "account/teachers",
  getClassSimple: baseUrl + "class/simple",
  registerImports: baseUrl + "register/import",
  deAtiveAccount: baseUrl + "account",
  deleteCourseInClass: baseUrl + "class/deletecourse?classId=",
  downloadSampleFile: baseUrl + "download/samplefile",
  importStudentToClass: baseUrl + "class/import/student",
  downloadAddStudentToClassSample: baseUrl + "class/download/samplefile",
};
