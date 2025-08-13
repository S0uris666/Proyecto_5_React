# NASAStats - Observatorio Estadístico Espacial

Aplicación web desarrollada con **React + Vite** que consume la **API de la NASA** para mostrar datos astronómicos y estadísticos de asteroides, imágenes astronómicas del día (APOD) y eventos espaciales.

##  Despliegue

La aplicación está desplegada en **Netlify** y puedes acceder a ella en el siguiente enlace:  

🔗 [NASA Stats - Proyecto React](https://nasastats.netlify.app)

##  Características principales

- **Imagen Astronómica del Día (APOD)** con detalles y galería histórica.
- **Búsqueda de asteroides cercanos a la Tierra** por rango de fechas.
- **Dashboard de datos espaciales**.
- Navegación con **React Router**.
- Consumo de API pública de la NASA con manejo de errores.
- Interfaz moderna con **Material UI (MUI)**.
- Validaciones y mensajes claros para mejorar la experiencia de usuario.

---

##  Tecnologías utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Material UI (MUI)](https://mui.com/)
- [Date-fns](https://date-fns.org/)
- Hooks de React: `useState`, `useEffect`, `useCallback`
- Error Boundaries para manejo de errores de renderizado

---

##  Estructura del proyecto
```text
PROYECTO_5/
├── node_modules/ # Dependencias instaladas
├── public/ # Archivos estáticos públicos
├── src/ # Código fuente principal
│ ├── components/ # Componentes reutilizables
│ ├── pages/ # Páginas y vistas principales
│ ├── utils/ #  llamadas API
│ ├── App.jsx # Componente raíz de la aplicación
│ ├── Router.jsx # Configuración de rutas con React Router
│ ├── main.jsx # Punto de entrada principal
├── .env # Variables de entorno (API keys, etc.)
├── .gitignore # Archivos y carpetas ignoradas por Git
├── eslint.config.js # Configuración de ESLint
├── index.html # HTML principal
├── package.json # Configuración de npm y dependencias
├── package-lock.json # Versión bloqueada de dependencias
├── README.md # Documentación del proyecto
└── vite.config.js # Configuración de Vite

```
##  Configuración de la API

Este proyecto utiliza la **API pública de la NASA**.  
Debes obtener tu API key gratuita en: [https://api.nasa.gov/](https://api.nasa.gov/)

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_NASA_API_URL=https://api.nasa.gov
VITE_API_KEY=TU_API_KEY_AQUI
```
## Instalación y ejecución 

### 1 Clona el repositorio
```env
git clone https://github.com/S0uris666/Proyecto_5_React.git
cd Proyecto_5_React/Proyecto_5
```
### 2 Instala dependencias
```env
npm install
```
### 3 Configura las variables de entorno

Crea el archivo .env como se indicó arriba.

### 4 Inicia el servidor de desarrollo
 ```env
 npm run dev
```
 ### 5 Abre en tu navegador

 ## Funcionalidades

 **1. Home**

Muestra la Imagen Astronómica del Día (APOD) directamente desde la API de la NASA y posee acceso a las rutas desde el header.

**2. Asteroids**

Permite buscar asteroides cercanos a la Tierra por rango de fechas.

Tabla con nombre, tamaño, distancia, velocidad y peligrosidad.

Detalles adicionales en un diálogo modal.

**3. Apod Image**

Muestra la imagen del día y permite buscar por fecha.

Galería con imágenes del mismo día en años anteriores.

**4. Apod Detail**

Vista detallada de una imagen astronómica específica.

**5. Dashboard**

El dashboard permite seleccionar un rango de fechas y consultar la API de la NASA para obtener datos de asteroides cercanos a la Tierra.

Actualmente incluye:
- Selección de fecha inicial y final.
- Validación de fechas.
- División automática en rangos de 7 días (limitación de la API).
- Conteo total de asteroides encontrados en el período.

**Estado:** El dashboard está en proceso de desarrollo. Próximamente se implementarán:
- Tablas y gráficas interactivas.

## Manejo de errores

ErrorBoundary captura errores de renderizado y muestra un mensaje amigable.

Manejo de errores en las llamadas a la API con try/catch y mensajes claros en la interfaz (Alert de MUI).