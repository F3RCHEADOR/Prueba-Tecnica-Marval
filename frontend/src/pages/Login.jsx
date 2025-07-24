// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUserInfo, userInfo }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      setUserInfo({}); 
      alert("Sesion cerrada exitosamente");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const usuarios = {
      admin: { username: "admin", password: "1234", rol: "admin" },
      user: { username: "user", password: "1234", rol: "user" },
    };

    const user = usuarios[username];

    if (!user || user.password !== password) {
      alert("Credenciales inválidas");
      return;
    }

    // Guardar usuario en localStorage
    const userObj = { username, password, rol: user.rol };
    localStorage.setItem("user", JSON.stringify(userObj));
    setUserInfo(userObj); // <-- Actualiza el estado global

    navigate("/");
  };

  return (
    <form onSubmit={handleLogin} className="p-4 space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
