import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardLayout } from "../components/layouts/dashboard";

const HomePage = lazy(() => import("./home"));
const DashboardPage = lazy(() => import("./dashboard"));

export default function XRouters() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
