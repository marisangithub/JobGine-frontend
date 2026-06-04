import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ResumeLibrary  from "./pages/ResumeLibrary";
import ProtectedRoute from "./components/ProtectedRoute";
import Analysis from "./pages/Analysis";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeHistory from "./pages/ResumeHistory";
import Jobs from "./pages/Jobs";
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/upload-resume"
  element={
    <ProtectedRoute>
      <UploadResume />
    </ProtectedRoute>
  }
/>
<Route
  path="/verify-otp"
  element={
    <VerifyOTP />
  }
/>

<Route
  path="/resume-library"
  element={
    <ProtectedRoute>
      <ResumeLibrary />
    </ProtectedRoute>
  }
/>
<Route
  path="/analysis"
  element={
    <ProtectedRoute>
      <Analysis />
    </ProtectedRoute>
  }
/>
<Route
  path="/resume-builder"
  element={
    <ProtectedRoute>
      <ResumeBuilder />
    </ProtectedRoute>
  }
/>
<Route
  path="/resume-history"
  element={
    <ProtectedRoute>
      <ResumeHistory />
    </ProtectedRoute>
  }
/>
<Route
  path="/jobs"
  element={
    <ProtectedRoute>
      <Jobs />
    </ProtectedRoute>
  }
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;