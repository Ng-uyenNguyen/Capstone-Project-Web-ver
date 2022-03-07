import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { BlankPage } from "../pages/BlankPage";
import { MainLayout } from "../layout/MainLayout";
import { ManageSubject } from "../pages/ManageSubject";
import { ManageClass } from "../pages/manage class/ManageClass";
import  ManageTeacher  from "../pages/manage teacher/ManageTeacher";
import { ClassDetail } from "../pages/manage class/ClassDetail";
import { Login } from "../pages/login/Login";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/schedules" element={<BlankPage />} />
          <Route path="/teachers" element={<ManageTeacher />} />
          <Route path="/students" element={<ManageTeacher/>} />
          <Route path="/classes" element={<ManageClass />} />
          <Route path="/specilizations" element={<personDetails />} />
          <Route path="/subjects" element={<ManageSubject />} />
          <Route path="/classDetail" element={<ClassDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
