import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Amenities from "./pages/Amenities";
import AmenityDetail from "./pages/AmenityDetail";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Services from "./pages/Services";
import ServicesSelection from "./pages/ServicesSelection";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import StoryPage from "./pages/StoryPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/amenities/:id" element={<AmenityDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/membership" element={<StoryPage forcedSlug="membership" />} />
          <Route path="/trainers" element={<StoryPage forcedSlug="trainers" />} />
          <Route path="/nutritionist" element={<StoryPage forcedSlug="nutritionist" />} />
          <Route
            path="/services"
            element={(
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/services/select"
            element={(
              <ProtectedRoute>
                <ServicesSelection />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/dashboard"
            element={(
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/admin"
            element={(
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
