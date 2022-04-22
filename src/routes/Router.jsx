import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { MainLayout } from "../layout/MainLayout";
import { ManageSubject } from "../pages/Manage Subject/ManageSubject";
import { ManageClass } from "../pages/manage class/ManageClass";
import { ManageTeacher } from "../pages/manage teacher/ManageTeacher";
import { ClassDetail } from "../pages/manage class/ClassDetail";
import { SchedulerManagement } from "../pages/manageScheduler";
import { Profile } from "../pages/Manage Info/Profile";
import { ChangePassword } from "../pages/Manage Info/ChangePassword";
import { ManageStudent } from "../pages/manage student/ManageStudent";
import { ManageSpecs } from "../pages/Manage Specs/ManageSpecs";
import { Login } from "../pages/login/Login";
import { ClassTimeTable } from "../pages/manage class/time table/ClassTimeTable";
import ProtectedRoute from "../ProtectedRoute";
import PageNotFound from "../pages/page not found/PageNotFound";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/management" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="schedules" element={<SchedulerManagement />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
