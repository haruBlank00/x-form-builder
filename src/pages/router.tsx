import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardLayout } from "../components/layouts/dashboard";
import { UserForm } from "./form";

const HomePage = lazy(() => import("./home"));
const DashboardPage = lazy(() => import("./dashboard"));
const FormBuilderPage = lazy(() => import("./form-builder"));
const FormPage = lazy(() => import("./form-builder/form"));

export default function XRouters() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/form-builder/form">
              <Route index element={<FormBuilderPage />} />

              <Route path=":formId" element={<FormPage />} />
            </Route>
          </Route>

          <Route path="/form/:formId" element={<UserForm />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
