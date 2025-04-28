//Conexión con Firebase
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

const titulo = document.getElementById('titulo');
const mensaje = document.getElementById('mensaje');
const signinButton = document.getElementById("google-sign-in");
const linkApp = document.getElementById('link_app');
const logoutButton = document.getElementById('logout-button');


signinButton.addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            updateUI(user);
            redirige(user);            
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
            updateUI(null);
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
        updateUI(user);
    } else {
        // El usuario ha cerrado sesión o no ha iniciado sesión
        //updateUI(null);
        console.log("Esto es user: ", user)
    }
});

// Función para actualizar la interfaz de usuario
function updateUI(user) {
    if (user) {
        console.log("updateUI, actualizando...")
        titulo.textContent = 'splashmix.ink 🪅🐙'
        mensaje.textContent = `Bienvenido, ${user.displayName}!`
        signinButton.style.display = 'none';
        linkApp.style.display = 'block';    
        logoutButton.style.display = 'block';

        // Muestra un mensaje de bienvenida
        // messageDiv.textContent = `Bienvenido, ${user.displayName}!`;
       
    } else {
        console.log("Deslogueado...");
        titulo.textContent = 'block';
        titulo.textContent = 'Bienvenido a splashmix.ink 🪅🐙';
        mensaje.textContent = "";
        signinButton.style.display = 'block';
        linkApp.style.display = 'none'; 
        logoutButton.style.display = 'none';
    }
}

function redirige(){
    window.location.href = "https://app.splashmix.ink/";
}