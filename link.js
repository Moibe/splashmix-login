// link.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtiene el dominio actual de la página
    const currentDomain = window.location.hostname;

    // 2. Define la URL de destino según el dominio actual
    let urlBase;
    if (currentDomain.includes('targetvox.com')) {
        urlBase = 'https://app.targetvox.com';
    } else { // Si no es targetvox, asume splashmix.ink
        urlBase = 'https://app.splashmix.ink';
    }

    // 3. Obtiene el elemento del botón
    const linkApp = document.getElementById('link_app');

    // 4. Si el botón existe, construye la URL completa y la asigna al atributo href
    if (linkApp) {
        linkApp.href = `${urlBase}?reload=true`;
    }
});