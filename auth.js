//Conexión con Firebase
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

const button = document.getElementById("google-sign-in")
const logoutButton = document.getElementById('logout-button');
const mensaje = document.getElementById('mensaje');

button.addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            updateUI(user);
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
        //updateUI(user);
        console.log("Esto es user: ", user)
        mensaje.textContent = `Bienvenido, ${user.displayName}!`
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
        // messageDiv.textContent = ``;
        // googleSignInButton.innerText =         
        
        // logoutButton.style.display = 'block';

        // Muestra un mensaje de bienvenida
        // messageDiv.textContent = `Bienvenido, ${user.displayName}!`;
       
    } else {
        console.log("Actualización cuando se desloguea...")
        mensaje.textContent = "Hola"
    }
}