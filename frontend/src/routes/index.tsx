import LoginPage from "@/pages/LoginPage"; // Your login page component
import { Navigate, Route, Routes } from "react-router";
import HomePage from "@/pages/HomePage";
import { useFrappeAuth } from "frappe-react-sdk";

const AppRoutes = () => {
  const { currentUser, isValidating } = useFrappeAuth();

  // Show a loading state while checking auth
  if (isValidating) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={!currentUser ? <LoginPage /> : <Navigate to="/" />}
      />

      <Route
        path="/"
        element={currentUser ? <HomePage /> : <Navigate to="/login" />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
