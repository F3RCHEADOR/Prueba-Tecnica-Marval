# 🧠 Backend - Prueba Técnica

Este es el backend desarrollado para la prueba técnica. Se trata de una API construida con **Node.js** y **Express**, lista para gestionar información con peticiones HTTP, y estructurada para poder escalarse fácilmente.

---

## 🚀 Tecnologías utilizadas

- **Node.js** – Entorno de ejecución JavaScript
- **Express** – Framework minimalista para crear APIs
- **Mongoose** – ODM para trabajar con MongoDB (preparado para usar si decides conectarte a una base de datos)
- **dotenv** – Manejo de variables de entorno
- **cors** – Permite peticiones desde otros orígenes
- **axios** – Cliente HTTP
- **nodemon** – Recarga automática en desarrollo

---

🛠️ Listo para ser extendido o conectado a una base de datos real de MongoDB

# env

⚙️ Variables de entorno
Debes crear un archivo .env en la raíz del proyecto con el siguiente contenido:

```env

API_MARVAL=TU_URL_DEL_API
USER_MARVAL=TU_USUARIO
PASS_MARVAL=TU_PASSWORD
MONGO_URI=TU_URI_DE_MONGODB
```

El archivo env no esta dentro del proyecto, se debera crear y llenar con la informacion en la documentacion dada.

## 📦 Instalación

1. Clona el repositorio o descarga el código.
2. Ve a la carpeta del backend:

```bash
cd backend
npm i
npm start
```

backend/
├── controllers/       # Lógica de manejo de rutas para proyectos y proveedores
├── routes/            # Definiciones de endpoints
├── middleware/        # middleware para autorizacion de rol y user
├── models/            # modelo de la base de datos
├── server.js          # El app.js , punto de partido, declaracion de api y conexion de mongo
├── .env               # Variables de entorno 
├── package.json       # Configuración del proyecto y scripts


