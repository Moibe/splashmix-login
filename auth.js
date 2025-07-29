//Conexión con Firebase
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

const titulo = document.getElementById('titulo');
const mensaje = document.getElementById('mensaje');
const signinButton = document.getElementById("google-sign-in");
const linkApp = document.getElementById('link_app');
const logoutButton = document.getElementById('logout-button');
const info_text = document.getElementById('info_text');

document.addEventListener('DOMContentLoaded', () => {
    console.log("Versión 0.0.0")
    const urlParams = new URLSearchParams(window.location.search);
    
    // Puedes elegir el nombre del parámetro que quieras, por ejemplo 'logout' o 'action=signout'
    if (urlParams.has('logout') && urlParams.get('logout') === 'true') {
        console.log("Parámetro 'logout=true' detectado en la URL. Iniciando cierre de sesión...");
        
        firebase.auth().signOut()
            .then(() => {
                console.log('Sesión cerrada correctamente vía URL.');
                // Redirige a una URL limpia para evitar cierres de sesión repetidos al refrescar
                // Puedes redirigir a tu página de inicio de sesión o a la página principal limpia
                const cleanUrl = window.location.origin + window.location.pathname;
                window.location.replace(cleanUrl); // window.location.replace() es mejor que href para esto
                                                   // porque previene que el usuario vuelva a la URL con el logout
                                                   // usando el botón "atrás" del navegador.
            })
            .catch((error) => {
                console.error(`Error al cerrar sesión vía URL: ${error.message}`);
                // Incluso si hay un error, es una buena práctica redirigir para limpiar la URL
                const cleanUrl = window.location.origin + window.location.pathname;
                window.location.replace(cleanUrl);
            });
    }
});

signinButton.addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            let first = checkIf1stTime();
            console.log("En signIn first es: ", first)
            updateUI(user, first);
            //redirige(user);            
        }).catch((error) => {
            console.log(`Error al iniciar sesión: ${error.message}`);
        });
});

//Listener para el botón de cierre de sesión
logoutButton.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            // El usuario ha cerrado sesión correctamente
            console.log('Sesión cerrada.');
            let first = checkIf1stTime();   
            updateUI(null, first);
        }).catch((error) => {
            // Ocurrió un error
           console.log(`Error al cerrar sesión: ${error.message}`);
        });
});

// Listener para detectar el estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // El usuario ha iniciado sesión        
        console.log("Esto es user: ", user);
        localStorage.setItem('estadoUsuario', 'Conectado');
        console.log("Checando if 1st time...")
        let first = checkIf1stTime();   
        console.log("Hay usuario y esto es first: ", first)    

        localStorage.setItem('1avez', 'false');
        localStorage.setItem('email', user.email);
        localStorage.setItem('name', user.displayName);
        localStorage.setItem('photo', user.photoURL);
        localStorage.setItem('uid', user.uid);
        console.log("Elementos seteados.")
        updateUI(user, first);
    } else {
        // El usuario ha cerrado sesión o no ha iniciado sesión
        //updateUI(null);
        console.log("Usuario no logueado")         
        localStorage.setItem('estadoUsuario', 'Desconectado');
        localStorage.removeItem('usuario');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('photo');
        localStorage.removeItem('uid'); 
        console.log("Elementos deseteados.")
        let first = checkIf1stTime();
        console.log("No hay usuario y esto es first: ", first)  
        updateUI(user, first)
    }
});

function checkIf1stTime() {
    let primeraVez; // Declara la variable 'uno'

        // Obtener el valor de '1avez' del localStorage
        const unaVezEnLocalStorage = localStorage.getItem('1avez');

        // Comprobar si 'unaVezEnLocalStorage' es null (es decir, no existe)
        if (unaVezEnLocalStorage === null) {
            console.log("El campo '1avez' NO existe en localStorage.");
            primeraVez = true;
        } else {
            // El campo '1avez' SÍ existe. Su valor puede ser lo que sea que hayas guardado.
            console.log("El campo '1avez' SÍ existe en localStorage. Su valor es:", unaVezEnLocalStorage);
            primeraVez = false; 
        }

        console.log("El valor final de 'primeraVez' es:", primeraVez);
        return primeraVez
}

// Función para actualizar la interfaz de usuario
function updateUI(user, first) {
    console.log("Estoy en updateUI y first es: ", first)
    if (user) {
        console.log("updateUI, hay usuario...")        
        titulo.textContent = 'splashmix.ink 🪅🐙'
        mensaje.textContent = `Bienvenido, ${user.displayName}!`
        signinButton.style.display = 'none';
        linkApp.style.display = 'block';    
        logoutButton.style.display = 'block';
        info_text.style.display = 'none';   
       
    } else {
        console.log("Estoy en updateUI y no hay usuario...");
        console.log("First es: ", first)
        if (first==false){
            console.log("Ya ha habido usuario aquí.")
            info_text.style.display = 'none'
        }
        else{ //Si no es false, o si no existe, debería caer aquí.
            console.log("No ha habido usuario aquí.")
            info_text.style.display = 'block'
            info_text.textContent = 'y empieza a usar tus créditos gratis.'
        }
        titulo.textContent = 'block';
        titulo.textContent = 'Bienvenido a splashmix.ink🪅🐙';
        mensaje.textContent = "";
        signinButton.style.display = 'block';
        linkApp.style.display = 'none'; 
        logoutButton.style.display = 'none';        
    }
}

function redirige(){
    window.location.href = "https://app.splashmix.ink/";
}