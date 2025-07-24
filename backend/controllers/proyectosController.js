import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const apiURL = process.env.API_MARVAL;
const userAPI = process.env.USER_MARVAL;
const passAPI = process.env.PASS_MARVAL;

export const obtenerProtectosExternos = async (req, res) => {
  try {
    console.log(apiURL, userAPI, passAPI);
    const authResponse = await axios.post(`${apiURL}/loginjwt`, {
      login: userAPI,
      pswd: passAPI,
    });

    const { accessToken , refreshToken } = authResponse.data;
    console.log("the token contains: ", accessToken, refreshToken)

    if (!accessToken) {
      return res.status(401).json({ msg: "No se recibió el token" });
    }

    const proyectosResponse = await axios.get(
      `${apiURL}/getAllProyectos`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    

    res.json(proyectosResponse.data);
  } catch (error) {
    console.error("Error al consumir la API externa:", error.message);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.status, error.response.data);
    }
    res.status(500).json({ msg: "Error al consumir la API externa" });
  }
};
