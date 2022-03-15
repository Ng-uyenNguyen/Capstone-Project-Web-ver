import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { BlankPage } from "../pages/BlankPage";
import { MainLayout } from "../layout/MainLayout";
import { ManageSubject } from "../pages/Manage Subject/ManageSubject";
import { ManageClass } from "../pages/manage class/ManageClass";
import ManageTeacher from "../pages/manage teacher/ManageTeacher";
import { ClassDetail } from "../pages/manage class/ClassDetail";
import { Profile } from "../pages/Manage Info/Profile";
import { ChangePassword } from "../pages/Manage Info/ChangePassword";
import { ManageStudent } from "../pages/manage student/ManageStudent";
import { ManageSpecs } from "../pages/Manage Specs/ManageSpecs";
import { Login } from "../pages/login/Login";
import { ClassTimeTable } from "../pages/manage class/time table/ClassTimeTable";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/management" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="schedules" element={<BlankPage />} />
          <Route path="teachers" element={<ManageTeacher />} />
          <Route path="students" element={<ManageStudent />} />
          <Route path="classes" element={<ManageClass />} />
          <Route path="classes/classDetail" element={<ClassDetail />} />
          <Route path="classes/classTimeTable" element={<ClassTimeTable />} />
          <Route path="specializations" element={<ManageSpecs />} />
          <Route path="subjects" element={<ManageSubject />} />
          <Route path="profile" element={<Profile />} />
          <Route path="changePassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
