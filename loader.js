// loader.js

console.log("Estoy en loaderjs")

// 1. Define la variable del entorno
const environment = 'dev'; // Cámbialo a 'prod' cuando vayas a producción

// 2. Determina el nombre del archivo de configuración
const configFileName = (environment === 'dev') ? 'config_dev.js' : 'config_prod.js';

// 3. Crea dinámicamente una nueva etiqueta <script>
const script = document.createElement('script');
script.src = configFileName;
script.type = 'text/javascript';

// Opcional: Para manejar la carga del script
script.onload = () => {
    console.log(`El archivo de configuración ${configFileName} se ha cargado correctamente.`);
};
script.onerror = () => {
    console.error(`Error al cargar el archivo de configuración ${configFileName}.`);
};

// 4. Agrega el nuevo script al <head> o <body> del documento
document.head.appendChild(script);