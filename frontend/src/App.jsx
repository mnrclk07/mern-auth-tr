import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Header />
            <Home />
            <Footer />
          </div>
        }
      />
      <Route
        path="/about"
        element={
          <div>
            <Header />
            <About />
            <Footer />
          </div>
        }
      />
      <Route
        path="/projects"
        element={
          <div>
            <Header />
            <Projects />
            <Footer />
          </div>
        }
      />
      <Route
        path="/search"
        element={
          <div>
            <Header />
            <Search />
            <Footer />
          </div>
        }
      />
      <Route
        path="/dashboard"
        element={
          <div>
            <Header />
            <Dashboard />
            <Footer />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div>
            <Header />
            <Register />
            <Footer />
          </div>
        }
      />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route
        path="/login"
        element={
          <div>
            <Header />
            <Login />
            <Footer />
          </div>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
