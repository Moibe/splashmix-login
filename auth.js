//Conexión con Firebase
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

const titulo = document.getElementById('titulo');
const mensaje = document.getElementById('mensaje');
const signinButton = document.getElementById("google-sign-in");
const linkApp = document.getElementById('link_app');
const logoutButton = document.getElementById('logout-button');
const info_text = document.getElementById('info_text');

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
        console.log("Esto es first: ", first)    

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
        console.log("Esto es user: ", user)
         
        localStorage.setItem('estadoUsuario', 'Desconectado');
        localStorage.removeItem('usuario');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('photo');
        localStorage.removeItem('uid'); 
        console.log("Elementos deseteados.")
    }
});

function checkIf1stTime() {
    let uno; // Declara la variable 'uno'

        // Obtener el valor de '1avez' del localStorage
        const unaVezEnLocalStorage = localStorage.getItem('1avez');

        // Comprobar si 'unaVezEnLocalStorage' es null (es decir, no existe)
        if (unaVezEnLocalStorage === null) {
            console.log("El campo '1avez' NO existe en localStorage.");
            uno = true;
        } else {
            // El campo '1avez' SÍ existe. Su valor puede ser lo que sea que hayas guardado.
            console.log("El campo '1avez' SÍ existe en localStorage. Su valor es:", unaVezEnLocalStorage);
            uno = false; 
        }

        console.log("El valor final de 'uno' es:", uno);
        return uno
}

// Función para actualizar la interfaz de usuario
function updateUI(user, first) {
    if (user) {
        console.log("updateUI, actualizando...")        
        titulo.textContent = 'splashmix.ink 🪅🐙'
        mensaje.textContent = `Bienvenido, ${user.displayName}!`
        signinButton.style.display = 'none';
        linkApp.style.display = 'block';    
        logoutButton.style.display = 'block';
        console.log("En updateUI cuando si hay user First es: ", first)
        if (first==false){
            console.log("Entre a first is false dentro de update cuando si hay user...")
            info_text.style.display = 'none'
        }
        
       
    } else {
        console.log("Deslogueado...");
        console.log("First es: ", first)
        titulo.textContent = 'block';
        titulo.textContent = 'Bienvenido a splashmix.ink🪅🐙';
        mensaje.textContent = "";
        signinButton.style.display = 'block';
        linkApp.style.display = 'none'; 
        logoutButton.style.display = 'none';
        if (first==false){
            info_text.style.display = 'none'
        }
        
    }
}

function redirige(){
    window.location.href = "https://app.splashmix.ink/";
}