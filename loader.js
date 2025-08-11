// loader.js

// 1. Define la variable del entorno
const environment = 'dev'; // Cámbialo a 'prod' cuando vayas a producción

// 2. Establece un atributo de datos en el cuerpo del documento
// Esto hace que la información del entorno esté disponible para todos los scripts.
document.body.setAttribute('data-environment', environment);

// 3. Determina el nombre del archivo de configuración
const configFileName = (environment === 'dev') ? 'config_dev.js' : 'config_prod.js';

// ... (resto de la función loadScript sin cambios) ...
const loadScript = (src, isModule = false) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        if (isModule) {
            script.type = 'module';
        }
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Error al cargar el script: ${src}`));
        document.body.appendChild(script);
    });
};

// 4. Inicia la cadena de carga de scripts
loadScript(configFileName)
    .then(() => {
        console.log(`El archivo de configuración ${configFileName} se ha cargado correctamente.`);
        return loadScript('auth.js', true);
    })
    .then(() => {
        console.log('El archivo auth.js se ha cargado correctamente.');
    })
    .catch((error) => {
        console.error(error);
    });