import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, ref, onValue, update} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    updatePassword,
    signInWithEmailAndPassword,
    updateEmail,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDpxXNFrji99t8a6QTcKhCmgIdA0ibs_lk",
    authDomain: "webcastle-website.firebaseapp.com",
    databaseURL: "https://webcastle-website-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "webcastle-website",
    storageBucket: "webcastle-website.appspot.com",
    messagingSenderId: "274339465548",
    appId: "1:274339465548:web:927dd550601c84dffce7e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

modifButton.addEventListener('click', (e) => {

    var type = document.getElementById('type').innerHTML;

    const user = auth.currentUser;

    const oldPassword = document.getElementById('oldMdp').value;

    if (type == "mot de passe") {
        signInWithEmailAndPassword(auth, user.email, oldPassword)
            .then((userCredential) => {

                const user = userCredential.user;

                if (document.getElementById('newMdp').value.length > 5) {
                    updatePassword(user, document.getElementById('newMdp').value).then(() => {
                        document.getElementById('popupmodif').style.display = 'none';
                        document.getElementById('popup-blur').style.display = 'none';
                        document.getElementById('mdpDiv').style.display = 'none';
                        document.getElementById('emailDiv').style.display = 'none';
                        document.getElementById('classicModif').style.display = 'none';
                    }).catch((error) => {
                        alert(error)
                    });
                } else {
                    document.getElementById('oldMdpAlerte').innerHTML = "Mot de passe trop court";
                }
            })
            .catch((error) => {
                document.getElementById('oldMdpAlerte').innerHTML = "Ancien mot de passe incorrect";
            });

    } else if (type == "email") {
        const user = auth.currentUser;

        const password = document.getElementById('emailMdp').value;

        const emailPatern = /^[^@]+@\w+(\.\w+)+\w$/;

        const email = document.getElementById('inputEmail').value;

        signInWithEmailAndPassword(auth, user.email, password)
            .then((userCredential) => {
                if (email.match(emailPatern)) {
                    updateEmail(auth.currentUser, email).then(() => {
                        document.getElementById('popupmodif').style.display = 'none';
                        document.getElementById('popup-blur').style.display = 'none';
                        document.getElementById('mdpDiv').style.display = 'none';
                        document.getElementById('emailDiv').style.display = 'none';
                        document.getElementById('classicModif').style.display = 'none';

                        update(ref(database, '/users/' + user.uid), {
                            email: email,
                        });
                    }).catch((error) => {
                        document.getElementById('emailAlerte').innerHTML = "email déjà utilisée par un utilisateur";
                    });

                } else {
                    document.getElementById('emailAlerte').innerHTML = "email invalide";
                }
            })
            .catch((error) => {
                document.getElementById('emailAlerte').innerHTML = "mot de passe incorrect";
            });
    } else {
        const user = auth.currentUser;

        var change = document.getElementById('inputModif').value

        if (type == "numéro de telephone") {
            if (change.length >= 10) {
                update(ref(database, '/users/' + user.uid), {
                    tel: change,
                });
                document.getElementById('popupmodif').style.display = 'none';
                document.getElementById('popup-blur').style.display = 'none';
                document.getElementById('mdpDiv').style.display = 'none';
                document.getElementById('emailDiv').style.display = 'none';
                document.getElementById('classicModif').style.display = 'none';
            } else {
                document.getElementById('inputAlerte').innerHTML = "Numéro de téléphone invalide";
            }

        } else {
            if (change.length >= 2) {
                update(ref(database, '/users/' + user.uid), {
                    [type]: change,
                });
                document.getElementById('popupmodif').style.display = 'none';
                document.getElementById('popup-blur').style.display = 'none';
                document.getElementById('mdpDiv').style.display = 'none';
                document.getElementById('emailDiv').style.display = 'none';
                document.getElementById('classicModif').style.display = 'none';
            } else {
                document.getElementById('inputAlerte').innerHTML = "saisi trop court";
            }
        }
    }
});

cancelButton.addEventListener('click', (e) => {
    document.getElementById('popupmodif').style.display = 'none';
    document.getElementById('popup-blur').style.display = 'none';
    document.getElementById('mdpDiv').style.display = 'none';
    document.getElementById('emailDiv').style.display = 'none';
    document.getElementById('classicModif').style.display = 'none';
});

window.addEventListener('load', function () {
    setTimeout(verifAccount, onAuthStateChanged)
});

function verifAccount() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const user = auth.currentUser;
            onValue(ref(database, '/users/' + user.uid), (snapshot) => {
                document.getElementById('nomCompte').innerHTML = (snapshot.val().nom);
                document.getElementById('prenomCompte').innerHTML = (snapshot.val().prenom);
                document.getElementById('emailCompte').innerHTML = (snapshot.val().email);
                document.getElementById('telCompte').innerHTML = (snapshot.val().tel);
                document.getElementById('actifDateAccount').innerHTML = user.metadata.creationTime;
            });
            onValue(ref(database, '/users/' + user.uid + "/" + "Site"), (snapshot) => {
                document.getElementById('nomSite').innerHTML = (snapshot.val().nom);
                document.getElementById('urlSite').innerHTML = (snapshot.val().url);
            });

        } else {
            window.location.href = "index.html";
        }
    });
};

logOutButton.addEventListener('click', (e) => {
    const auth = getAuth();
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        alert("non")
    });
});