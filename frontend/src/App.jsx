import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/modules/Header";
import Footer from "./components/modules/Footer";
import List from "./pages/List";
import FormPage from "./pages/FormPage";
import Login from "./pages/Login";
import Details from "./pages/details";
import Proyectos from "./pages/Proyectos";
import { useState, useEffect } from "react";

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
            <Route path="/" element={<List />} />
            <Route
              path="/form"
              element={
                <FormPage setUserInfo={setUserInfo} userInfo={userInfo} />
              }
            />
            <Route
              path="/login"
              element={<Login setUserInfo={setUserInfo} userInfo={userInfo} />}
            />
            <Route
              path="/details/:id"
              element={
                <Details setUserInfo={setUserInfo} userInfo={userInfo} />
              }
            />
            <Route path="/proyectos" element={<Proyectos />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
