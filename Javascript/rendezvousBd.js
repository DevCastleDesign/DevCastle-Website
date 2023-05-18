import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getDatabase,
    set,
    ref,
    update
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
const database = getDatabase(app);
const auth = getAuth();

submitButton.addEventListener('click', (e) => {

    const user = auth.currentUser;

    errorMsg.innerHTML = "";
    if ((adressFields.children[2].value === "" || adressFields.children[4].value === "") && mode === 0) {
        errorMsg.innerHTML = "Veuillez saisir une adresse complète";
    } else if (videoFields.children[2].value === "" && mode === 1) {
        errorMsg.innerHTML = "Veuillez votre nom d'utilisateur " + videoModeString;
    } else if (selectedHour === -1) {
        errorMsg.innerHTML = "Veuillez selectionner une heure";
    } else if (document.getElementById("infos-name").value === "") {
        errorMsg.innerHTML = "Veuillez saisir votre nom";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("infos-email").value)) {
        errorMsg.innerHTML = "Veuillez saisir un email correct";
    } else if (document.getElementById("infos-tel").value === "") {
        errorMsg.innerHTML = "Veuillez saisir votre numero de télephone";
    } else {

        submitButton.disabled = true;
        submitButton.style.opacity = 0.6;

        if (mode === 0) {
            set(ref(database, 'users/' + user.uid + "/rdv"), {
                datetime: dname.innerHTML,
                email: document.getElementById('infos-email').value,
                mode: "presentiel",
                loc: adressFields.children[1].value + " " + adressFields.children[2].value + " | " + document.getElementById('adresse').value,
                name: document.getElementById("infos-name").value,
                tel: document.getElementById("infos-tel").value,
                more: document.getElementById("infos-more").value,
            });

        } else {
            set(ref(database, 'users/' + user.uid + "/rdv"), {
                datetime: dname.innerHTML,
                email: document.getElementById('infos-email').value,
                mode: "visio",
                plateform: videoModeString,
                username: videoFields.children[2].value,
                name: document.getElementById("infos-name").value,
                tel: document.getElementById("infos-tel").value,
                more: document.getElementById("infos-more").value,
            });


        }

        update(ref(database, 'users/' + user.uid), {
            status: "AttenteRdv",
        });

        setTimeout(changePage, 500)
        function changePage() {
            window.location.href = "remerciRendezvous.html";
        }

        sendMail()

    }
});