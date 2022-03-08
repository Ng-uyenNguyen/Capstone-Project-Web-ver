import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { BlankPage } from "../pages/BlankPage";
import { MainLayout } from "../layout/MainLayout";
import {ManageSubject} from "../pages/Manage Subject/ManageSubject"
import { ManageClass } from "../pages/manage class/ManageClass";
import  ManageTeacher  from "../pages/manage teacher/ManageTeacher";
import { ClassDetail } from "../pages/manage class/ClassDetail";
import { Profile} from "../pages/Manage Info/Profile";
import { ChangePassword } from "../pages/Manage Info/ChangePassword";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/schedules" element={<BlankPage />} />
          <Route path="/teachers" element={<ManageTeacher />} />
          <Route path="/students" element={<ManageTeacher/>} />
          <Route path="/classes" element={<ManageClass />} />
          <Route path="/specilizations" element={<personDetails />} />
          <Route path="/subjects" element={<ManageSubject />} />
          <Route path="/classDetail" element={<ClassDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
