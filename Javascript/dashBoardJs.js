import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    updatePassword,
    signInWithEmailAndPassword,
    updateEmail,
    deleteUser
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    getDownloadURL,
    uploadBytes,
    listAll,
    getMetadata
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

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
const storage = getStorage(app);

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
                const status = (snapshot.val().status);

                onValue(ref(database, '/users/' + user.uid + "/site/maquette"), (snapshot) => {
                    const statusMaquette = (snapshot.val().status);
                    const date_debut_Maq = (snapshot.val().date_debut);
                    const date_fin_Maq = (snapshot.val().date_fin);

                    onValue(ref(database, '/users/' + user.uid + "/site/developpement"), (snapshot) => {
                        const statusDev = (snapshot.val().status);
                        const date_debut_Dev = (snapshot.val().date_debut);
                        const date_fin_Dev = (snapshot.val().date_fin);

                        onValue(ref(database, '/users/' + user.uid + "/site/informations"), (snapshot) => {
                            document.getElementById('nomSite').innerHTML = (snapshot.val().nom_site);
                            document.getElementById('siteNom').innerHTML = (snapshot.val().nom_site);
                        }, {
                            onlyOnce: true
                        });

                        if (status == 'maquette') {

                            document.getElementById('onStatus').style.display = 'block';
                            document.getElementById('noStatus').style.display = 'none';
                            document.getElementById('titreAttenteDiv').innerHTML = "Maquette"

                            document.getElementById('statusGoButton').addEventListener('click', (e) => {
                                window.location.href = "https://devcastledesign.github.io/DevCastle-Website/maquette.html";
                            });


                            if (statusMaquette == "dev") {
                                document.getElementById('statusAttenteDiv').innerHTML = "En développement";
                                document.getElementById('dateAttenteDiv').innerHTML = "Commencé le " + date_debut_Maq;
                            } else if (statusMaquette == "termine") {
                                document.getElementById('statusAttenteDiv').innerHTML = "terminé";
                                document.getElementById('dateAttenteDiv').innerHTML = "Fini le " + date_fin_Maq;
                            } else {
                                document.getElementById('statusAttenteDiv').innerHTML = "En Attente";
                                document.getElementById('dateAttenteDiv').innerHTML = "";
                            }
                        } else if (status == 'developpement') {

                            document.getElementById('onStatus').style.display = 'block';
                            document.getElementById('noStatus').style.display = 'none';
                            document.getElementById('titreAttenteDiv').innerHTML = "Développement"

                            document.getElementById('statusGoButton').addEventListener('click', (e) => {
                                window.location.href = "https://devcastledesign.github.io/DevCastle-Website/developpement.html";
                            });

                            if (statusDev == "dev") {
                                document.getElementById('statusAttenteDiv').innerHTML = "En développement";
                                document.getElementById('dateAttenteDiv').innerHTML = "Commencé le " + date_debut_Dev;
                            } else if (statusDev == "termine") {
                                document.getElementById('statusAttenteDiv').innerHTML = "terminé";
                                document.getElementById('dateAttenteDiv').innerHTML = "Fini le " + date_fin_Dev;
                            } else {
                                document.getElementById('statusAttenteDiv').innerHTML = "En Attente";
                                document.getElementById('dateAttenteDiv').innerHTML = "";
                            }
                        } else if (status == 'termine') {

                            const codeSourceButton = document.getElementById('codeSourceButton');
                            codeSourceButton.style.opacity = '100%';
                            codeSourceButton.disabled = false;
                            document.getElementById('noStatus').style.display = 'block';
                            document.getElementById('onStatus').style.display = 'none';
                        } else {
                            document.getElementById('noStatus').style.display = 'block';
                            document.getElementById('onStatus').style.display = 'none';
                        }
                    });
                }, {
                    onlyOnce: true
                });
            }, {
                onlyOnce: true
            });

            onValue(ref(database, '/users/' + user.uid + "/" + "Site"), (snapshot) => {
                document.getElementById('nomSite').innerHTML = (snapshot.val().nom);
                document.getElementById('urlSite').innerHTML = (snapshot.val().url);
            });

            onValue(ref(database, '/users/' + user.uid + "/site/hebergement"), (snapshot) => {
                if (snapshot.val().status == "") {
                    document.getElementById('hostingNoSub').style.display = 'block';
                    const urlSite = document.getElementById('urlSite');
                    urlSite.innerHTML = "plan d'hebergement requis pour avoir une url";
                    urlSite.style = 'opacity: 30%; cursor: pointer';
                    urlSite.addEventListener('click', (e) => {
                        OpenDashboard(2);
                    });
                } else {
                    document.getElementById('hostingSub').style.display = 'block';
                    document.getElementById('urlSite').innerHTML = (snapshot.val().adresse);
                    document.getElementById('siteUrl').innerHTML = (snapshot.val().adresse);
                    document.getElementById('statusHeberg').innerHTML = (snapshot.val().status);
                    document.getElementById('adresseHeberg').innerHTML = (snapshot.val().adresse);
                }
            }, {
                onlyOnce: true
            });

            let imageListe = [];

            listAll(sRef(storage, "users/" + user.uid + "/images/")).then((res) => {
                res.items.forEach((itemRef) => {
                    imageListe.push(itemRef.name)
                });

                const random = Math.floor(Math.random() * imageListe.length);

                getDownloadURL(sRef(storage, "users/" + user.uid + "/images/" + (random, imageListe[random])))
                    .then((url) => {
                        const img = document.getElementById("imgSrc");

                        img.style.backgroundImage = 'url(' + url + ')';

                    })
                    .catch((error) => {
                        alert("no image")
                    });
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

suppAccount.addEventListener('click', (e) => {

    document.getElementById('popup-blur').style.display = 'block';
    document.getElementById('suppAccountPopup').style.display = 'block';
});


suppAccountButton.addEventListener('click', (e) => {

    const user = auth.currentUser;
    signInWithEmailAndPassword(auth, user.email, document.getElementById('supAccountMdp').value)
        .then((userCredential) => {
            deleteUser(user).then(() => {
                remove(ref(database, 'users/' + user.uid), {});
                window.location.href = "index.html";
            }).catch((error) => {
                alert(error)
            });
        })
        .catch((error) => {
            document.getElementById('suppCompteMdpAlerte').innerHTML = "mot de passe incorrect";
        });
});

cancelSuppAccountButton.addEventListener('click', (e) => {
    document.getElementById('suppAccountPopup').style.display = 'none';
    document.getElementById('popup-blur').style.display = 'none';
});


hostButton.addEventListener('click', (e) => {
    window.location.href = "hebergementInfo.html";
});


siteUrl.addEventListener('click', (e) => {
    window.open('https://' + siteUrl.value);
});

let test = [];

reloadImageIcon.addEventListener('click', (e) => {
    const user = auth.currentUser;

    listAll(sRef(storage, "users/" + user.uid + "/images/")).then((res) => {
        res.items.forEach((itemRef) => {
            test.push(itemRef.name)
        });

        const random = Math.floor(Math.random() * test.length);

        getDownloadURL(sRef(storage, "users/" + user.uid + "/images/" +(random, test[random])))
            .then((url) => {
                const img = document.getElementById("imgSrc");

                img.style.backgroundImage = 'url(' + url + ')';
            })
            .catch((error) => {
                alert("no image")
            });
    });
});

infoSupp.addEventListener('click', (e) => {
    document.getElementById('popup-blur').style.display = 'block';
    document.getElementById('popup-hebergement').style.display = 'block';
});

document.getElementById('codeSourceButton').addEventListener('click', (e) => {
    const user = auth.currentUser;

    onValue(ref(database, '/users/' + user.uid), (snapshot) => {
        const status = (snapshot.val().status);

        if(status == 'termine') {
            getDownloadURL(sRef(storage, "users/" + user.uid + "/source.zip"))
                .then((url) => {
                    var a = document.createElement('a');
                    a.href = a.download = url;
                    document.body.append(a);
                    a.click();
                    a.remove()
                    window.URL.revokeObjectURL(url)
                })
                .catch((error) => {
                    alert("Une erreur s'est produite. Veuillez nous contacter si le problème persiste")
                });
        }
    }, {
        onlyOnce: true
    });
});