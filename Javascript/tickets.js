import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getDatabase,
    set,
    get,
    child,
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

document.getElementById("new-ticket-send").addEventListener('click', (e) => {
    const user = auth.currentUser;

    get(child(ref(database), "tickets")).then((tickets_snapshot) => {
        var ticket_id = 0;
        if (tickets_snapshot.exists()) {
            ticket_id = Object.keys(tickets_snapshot.val()).length;
        }
        get(child(ref(database), `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var name = snapshot.val().prenom;
                var lastname = snapshot.val().nom;
                set(ref(database, "tickets/ticket_" + ticket_id), {
                    author_id: user.uid,
                    author_first_name: name,
                    author_last_name: lastname,
                    title: document.getElementById("new-ticket-title").value,
                    content: document.getElementById("new-ticket-content").value,
                    answer: ""
                });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    });
    ClosePopups();
});