import { Navigate, Route, Routes } from "react-router-dom"
import { Dashboard } from "../pages/dashboard"
import { LoginPage } from "../pages/login"
import { RegisterPage } from "../pages/register"

export const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}
