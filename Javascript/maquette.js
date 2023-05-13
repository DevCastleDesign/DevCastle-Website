import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getAuth, onAuthStateChanged,} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {getDatabase, ref, onValue, update} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
let modif = false;

const firebaseConfig = {
    apiKey: "AIzaSyDpxXNFrji99t8a6QTcKhCmgIdA0ibs_lk",
    authDomain: "webcastle-website.firebaseapp.com",
    databaseURL: "https://webcastle-website-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "webcastle-website",
    storageBucket: "webcastle-website.appspot.com",
    messagingSenderId: "274339465548",
    appId: "1:274339465548:web:927dd550601c84dffce7e9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

document.getElementById('nextStepButton').disabled = true;
document.getElementById('modifDemandeButton').style.display = "none";

onAuthStateChanged(auth, (user) => {

    if (user) {
        onValue(ref(database, 'users/' + user.uid + "/site/maquette"), (snapshot) => {
            const status = (snapshot.val().status);
            const dateDebut = (snapshot.val().date_debut);
            const dateFin = (snapshot.val().date_fin);

            if (status == "dev") {
                divStatus.style.backgroundColor = '#20629E';
                document.getElementById('statusText').innerHTML = "En développement";
                document.getElementById('maquetteDate').innerHTML = "Débuté le " + dateDebut;
                if (snapshot.val().modif != null) {
                    document.getElementById('titleText').innerHTML = "Vos modifications sont actuellement en cours de création";
                }
            } else if (status == "termine") {
                divStatus.style.backgroundColor = '#2A9E20';
                document.getElementById('statusText').innerHTML = "terminé";
                document.getElementById('mailEnvoye').innerHTML = "";
                document.getElementById('titleText').innerHTML = "";
                document.getElementById('maquetteDate').innerHTML = "Fini le " + dateFin;
                document.getElementById('nextStepButton').style.opacity = '100%';

                document.getElementById('nextStepButton').disabled = false;

                document.getElementById('maquetteViewer').style.display = "block"
                document.getElementById('modifDemandeButton').style.display = "block";

            } else {
                document.getElementById('statusText').innerHTML = "En attente";
            }
        }, {
            onlyOnce: true
        });
    } else {
        window.location.href = "index.html";
    }
});

document.getElementById('nextStepButton').addEventListener('click', (e) => {

    const user = auth.currentUser;

    window.location.href = "developpement.html";

    update(ref(database, 'users/' + user.uid), {
        status: "dev",
    });
});

document.getElementById('modifDemandeButton').addEventListener('click', (e) => {

    if (modif) {
        const user = auth.currentUser;

        update(ref(database, 'users/' + user.uid + '/site/maquette'), {
            status: "dev",
            modif: document.getElementById('modifDemande').value
        });

        setTimeout(() => {location.reload()}, 500);
    } else {
        document.getElementById('modifDemande').style.display = "block";
        modif = true;
        document.getElementById('modifDemandeButton').value = "Envoyer";
    }
});
