import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { BlankPage } from "../pages/BlankPage";
import { MainLayout } from "../layout/MainLayout";
import { ManageClass } from "../pages/manage class/ManageClass";
import ManageTeacher from "../pages/manage teacher/ManageTeacher";
import { ClassDetail } from "../pages/manage class/ClassDetail";
import { Login } from "../pages/login/Login";
import ManageStudent from "../pages/manage student/ManageStudent";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/management" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="schedules" element={<BlankPage />} />
          <Route path="teachers" element={<ManageTeacher />} />
          <Route path="students" element={<ManageStudent />} />
          <Route path="classes" element={<ManageClass />} />
          <Route path="specilizations" element={<BlankPage />} />
          <Route path="subjects" element={<BlankPage />} />
          <Route path="classes/classDetail" element={<ClassDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
