# Prueba Técnica Marval - Frontend

Este proyecto es una aplicación web desarrollada en React para la gestión de proveedores y proyectos, como parte de una prueba técnica. Incluye autenticación básica, registro y edición de proveedores, visualización de detalles, paginación de proyectos y una interfaz moderna y responsiva con Tailwind CSS.

## Características principales

- **Login de usuario** (admin/user) con almacenamiento en localStorage.
- **Listado y registro de proveedores** con formulario validado y campos dinámicos (beneficiarios, datos bancarios).
- **Edición y eliminación de proveedores** mediante modales.
- **Detalle de proveedor** con toda la información relevante.
- **Listado y paginación de proyectos** (hasta 42 por página, 3 columnas).
- **Interfaz moderna y pastel**: colores suaves, efectos de hover/focus, responsiva.
- **Sincronización de sesión** entre localStorage y estado global.
- **Código modular y reutilizable**.

## Estructura del proyecto


frontend/ │ ├── src/ │ ├── components/ │ │ └── ui/ │ │ ├── CardProveedor.jsx │ │ └── EditProveedorModal.jsx │ ├── lib/ │ │ └── fetchs.js │ ├── pages/ │ │ ├── FormPage.jsx │ │ ├── Login.jsx │ │ ├── Proyectos.jsx │ │ ├── details.jsx │ │ └── ... │ ├── App.jsx │ └── index.js │ ├── public/ │ └── ... └──

## Instalación y ejecución

1. **Clona el repositorio**  
   ```bash
   git clone <url-del-repo>
   cd frontend

   Admin:
Usuario: admin
Contraseña: 1234

Usuario:
Usuario: user
Contraseña: 1234

El backend debe exponer endpoints compatibles con los métodos usados en lib/fetchs.js.
El estado de sesión se gestiona con React y localStorage.
El diseño utiliza Tailwind CSS para estilos rápidos y responsivos.
El código es fácilmente escalable y modular.