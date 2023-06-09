import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
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

initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('navAccount').style.display = "flex";
        document.getElementById('navNoAccount').style.display = "none";
    } else {
        document.getElementById('navNoAccount').style.display = "flex";
        document.getElementById('navAccount').style.display = "none";
    }
});

logOutButton.addEventListener('click', (e) => {
    signOut(auth).then(() => {
        document.getElementById('navAccount').style.display = "none";
        window.location.reload();
    }).catch((error) => {
        alert("non")
    });
});