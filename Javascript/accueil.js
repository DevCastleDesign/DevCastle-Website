import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.API_KEY;

const firebaseConfig = {
    apiKey: apiKey,
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


window.addEventListener('load', function () {
    setTimeout(verifAccount, onAuthStateChanged)
});

function verifAccount() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.getElementById('navAccount').style.display = "flex";
            document.getElementById('navNoAccount').style.display = "none";
            document.getElementById('commandeButton').value = "continuer";

            onValue(ref(database, '/review'), (snapshot) => {
                const nbrRat = (snapshot.val().nombre_ratting);
                const totalNum = (snapshot.val().total_ratting);

                function round(value, step) {
                    step || (step = 1.0);
                    var inv = 1.0 / step;
                    return Math.round(value * inv) / inv;
                }

                document.getElementById('ratting').style.visibility = "visible";

                let ratePercentage = (round((totalNum/nbrRat) , 0.5) / 5) * 100;
                const inner = document.getElementById(`inner`)
                inner.style.width = `${ratePercentage}%`
            });
        } else {
            document.getElementById('navNoAccount').style.display = "flex";
            document.getElementById('navAccount').style.display = "none";

            onValue(ref(database, '/review'), (snapshot) => {
                const nbrRat = (snapshot.val().nombre_ratting);
                const totalNum = (snapshot.val().total_ratting);

                function round(value, step) {
                    step || (step = 1.0);
                    var inv = 1.0 / step;
                    return Math.round(value * inv) / inv;
                }

                document.getElementById('ratting').style.visibility = "visible";

                let ratePercentage = (round((totalNum/nbrRat) , 0.5) / 5) * 100;
                const inner = document.getElementById(`inner`)
                inner.style.width = `${ratePercentage}%`
            });
        }
    });
}

logOutButton.addEventListener('click', (e) => {
    const auth = getAuth();
    signOut(auth).then(() => {
        document.getElementById('navAccount').style.display = "none";
        window.location.reload();
    }).catch((error) => {
        alert("non")
    });
});



commandeButton.addEventListener('click', (e) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            onValue(ref(database, '/users/' + user.uid), (snapshot) => {
                const status = (snapshot.val().status);
                if (status == "inscrit") {
                    window.location.href = "options.html";
                } else if (status == "rdv") {
                    window.location.href = "rendezvous.html";
                } else if (status == "AttenteRdv") {
                    window.location.href = "remerciRendezvous.html";
                } else if (status == "design") {
                    window.location.href = "site-information.html";
                } else if (status == "maquette") {
                    window.location.href = "maquette.html";
                } else if (status == "dev"){
                    window.location.href = "developpement.html";
                } else {
                    window.location.href = "dashboard.html";
                }
            }, {
                onlyOnce: true
            });
        } else {
            window.location.href = "site-welcome.html";
        }
    });
});