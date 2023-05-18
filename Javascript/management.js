import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getDatabase,
    onValue,
    set,
    ref,
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

onValue(ref(database, 'users'), (snapshot) => {
    const users = Object.values(snapshot.val());
    document.getElementById("users-table").innerHTML = `
    <tr>
        <th>Nom</th>
        <th>Prenom</th>
        <th>Email</th>
        <th>Etape</th>
    </tr>
    `;
    for (let i = 0; i < users.length; i++) {
        document.getElementById("users-table").innerHTML += `
        <tr>
            <td>` + users[i].nom + `</td>
            <td>` + users[i].prenom + `</td>
            <td>` + users[i].email + `</td>
            <td>` + users[i].status + `</td>
        </tr>
        `;
    }
});

onValue(ref(database, 'tickets'), (snapshot) => {
    const tickets = Object.values(snapshot.val());
    document.getElementById("tickets-table").innerHTML = `
    <tr>
        <th>Titre</th>
        <th>Statut</th>
    </tr>
    `;
    for (let i = 0; i < tickets.length; i++) {
        document.getElementById("tickets-table").innerHTML += `
        <tr>
            <td>` + tickets[i].title + `</td>
            <td>` + (tickets[i].answer === "" ? "non résolu" : "résolu") + `</td>
        </tr>
        `;
    }
});

onValue(ref(database, 'review/avis'), (snapshot) => {
    const ratings = Object.values(snapshot.val());
    const ratings_keys = Object.keys(snapshot.val());
    document.getElementById("ratings-table").innerHTML = `
    <tr>
        <th>Client</th>
        <th>Etoiles</th>
    </tr>
    `;
    for (let i = 0; i < ratings.length; i++) {
        document.getElementById("ratings-table").innerHTML += `
        <tr>
            <td>` + (ratings_keys[i].slice(5).replace("_"," ")) + `</td>
            <td>` + ratings[i].etoile + `</td>
        </tr>
        `;
    }
});