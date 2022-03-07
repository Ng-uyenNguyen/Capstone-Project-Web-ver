import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { BlankPage } from "../pages/BlankPage";
import { MainLayout } from "../layout/MainLayout";
import {ManageSubject} from "../pages/Manage Subject/ManageSubject"
import { ManageClass } from "../pages/manage class/ManageClass";
import { ClassDetail } from "../pages/manage class/ClassDetail";
import { Profile } from "../pages/Manage Info/Profile";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/schedules" element={<BlankPage />} />
          <Route path="/teachers" element={<BlankPage />} />
          <Route path="/students" element={<Profile />} />
          <Route path="/classes" element={<ManageClass />} />
          <Route path="/specilizations" element={<BlankPage />} />
          <Route path="/subjects" element={<ManageSubject />} />
          <Route path="/classDetail" element={<ClassDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
