import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import FloatingOrb from "./components/FloatingOrb";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmail from "./pages/VerifyEmail";
import { useAuthStore } from "./store/authStore";
import AuthLoader from "./components/AuthLoader";
import HomePage from "./pages/HomePage";
import AuthGuard from "./components/AuthGuard";

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <AuthLoader />;
  }

  return (
    <div className="relative h-screen w-screen flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
      <FloatingOrb color="bg-indigo-500" size="w-72 h-72" top="-20%" left="-10%" delay={0} />
      <FloatingOrb color="bg-purple-500" size="w-32 h-32" top="70%" left="80%" delay={5} />
      <FloatingOrb color="bg-indigo-700" size="w-48 h-48" top="40%" left="-10%" delay={2} />
      <FloatingOrb color="bg-purple-700" size="w-72 h-48" top="50%" left="50%" delay={0} />

      <ToastContainer position="top-right" autoClose={2500} />

      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard requireAuth requireVerified>
              <HomePage />
            </AuthGuard>
          }
        />

        <Route
          path="/login"
          element={
            <AuthGuard>
              <LoginPage />
            </AuthGuard>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthGuard>
              <SignUpPage />
            </AuthGuard>
          }
        />

        <Route
          path="/verify-email"
          element={
            <AuthGuard requireAuth>
              <VerifyEmail />
            </AuthGuard>
          }
        />

        <Route path="/forgot-password" element="Forgot Password Page" />
        <Route path="/reset-password" element="Reset Password Page" />

        <Route path="/*" element="404 Not Found" />
      </Routes>
    </div>
  );
}

export default App;
