import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/modules/Header";
import Footer from "./components/modules/Footer";
import List from "./pages/List";
import FormPage from "./pages/FormPage";
import Login from "./pages/Login";
import Details from "./pages/details";
import Proyectos from "./pages/Proyectos";
import { useState, useEffect } from "react";

// Componente para proteger rutas
function ProtectedRoute({ userInfo, children }) {
  const location = useLocation();
  if (!userInfo || !userInfo.username) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user")) || {});
  }, []);

  return (
    <BrowserRouter>
      <Header setUserInfo={setUserInfo} userInfo={userInfo} />
      <div className="container mx-auto px-4">
        <div className="min-h-screen">
          <Routes>
            <Route
              path="/login"
              element={<Login setUserInfo={setUserInfo} userInfo={userInfo} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute userInfo={userInfo}>
                  <List />
                </ProtectedRoute>
              }
            />
            <Route
              path="/form"
              element={
                <ProtectedRoute userInfo={userInfo}>
                  <FormPage setUserInfo={setUserInfo} userInfo={userInfo} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/details/:id"
              element={
                <ProtectedRoute userInfo={userInfo}>
                  <Details setUserInfo={setUserInfo} userInfo={userInfo} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/proyectos"
              element={
                <ProtectedRoute userInfo={userInfo}>
                  <Proyectos />
                </ProtectedRoute>
              }
            />
            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
