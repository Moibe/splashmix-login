//Conexión con Firebase
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

const button = document.getElementById("google-sign-in")
console.log("Ésto es button: ", button)

button.addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            updateUI(user);
            redirige(user);            
        }).catch((error) => {
            console.log(`Error al iniciar sesión: ${error.message}`);
        });
});

// Listener para detectar el estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // El usuario ha iniciado sesión
        //updateUI(user);
        console.log("Esto es user: ", user)
    } else {
        // El usuario ha cerrado sesión o no ha iniciado sesión
        //updateUI(null);
        console.log("Esto es user: ", user)
    }
});