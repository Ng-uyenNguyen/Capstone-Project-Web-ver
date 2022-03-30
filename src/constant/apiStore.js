const baseUrl = "https://capstone-web-server-nabati.herokuapp.com/";

export const apiStore = {
  login: baseUrl + "login",
  getAllSubjects: baseUrl+"subject",
  getSubjectByID: baseUrl+"subject/byid/{id}?id=",
  getAllClass: baseUrl + "class" ,
  getScheduleByClassId: baseUrl + "byclassid?classId="
};