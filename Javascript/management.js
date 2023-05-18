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