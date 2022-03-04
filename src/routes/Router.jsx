import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { BlankPage } from "../pages/BlankPage";
import { MainLayout } from "../layout/MainLayout";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/schedules" element={<BlankPage />} />
          <Route path="/teachers" element={<BlankPage />} />
          <Route path="/students" element={<BlankPage />} />
          <Route path="/classes" element={<BlankPage />} />
          <Route path="/specilizations" element={<BlankPage />} />
          <Route path="/subjects" element={<BlankPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
