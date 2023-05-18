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
    let html = `
    <tr>
        <th>Nom</th>
        <th>Prenom</th>
        <th>Email</th>
        <th>Etape</th>
    </tr>
    `;
    for (let i = 0; i < users.length; i++) {
        let shortUser = {
            email: users[i].email,
            nom: users[i].nom,
            prenom: users[i].prenom,
            pays: users[i].pays,
            status: users[i].status,
            tel: users[i].tel,
        };
        html += `
        <tr onclick='ShowUser("` + (JSON.stringify(shortUser).replaceAll("\"", "\\\"")) + `")'>
            <td>` + users[i].nom + `</td>
            <td>` + users[i].prenom + `</td>
            <td>` + users[i].email + `</td>
            <td>` + users[i].status + `</td>
        </tr>
        `;
    }
    document.getElementById("users-table").innerHTML = html;
});

onValue(ref(database, 'tickets'), (snapshot) => {
    const tickets = Object.values(snapshot.val());
    let html = `
    <tr>
        <th>Titre</th>
        <th>Statut</th>
    </tr>
    `;
    for (let i = 0; i < tickets.length; i++) {
        html += `
        <tr>
            <td>` + tickets[i].title + `</td>
            <td>` + (tickets[i].answer === "" ? "non résolu" : "résolu") + `</td>
        </tr>
        `;
    }
    document.getElementById("tickets-table").innerHTML = html;
});

onValue(ref(database, 'review/avis'), (snapshot) => {
    const ratings = Object.values(snapshot.val());
    const ratings_keys = Object.keys(snapshot.val());
    let html = `
    <tr>
        <th>Client</th>
        <th>Etoiles</th>
    </tr>
    `;
    for (let i = 0; i < ratings.length; i++) {
        html += `
        <tr>
            <td>` + (ratings_keys[i].slice(5).replaceAll("_"," ")) + `</td>
            <td>` + ratings[i].etoile + `</td>
        </tr>
        `;
    }
    document.getElementById("ratings-table").innerHTML = html;
});