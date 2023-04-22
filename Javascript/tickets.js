import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getDatabase,
    set,
    get,
    child,
    ref,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
    getAuth,
    onAuthStateChanged,
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
                    nom: name,
                    prenom: lastname,
                    title: document.getElementById("new-ticket-title").value,
                    content: document.getElementById("new-ticket-content").value.replace(/\r?\n/g, '<br>'),
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

function refreshTicketsList() {
    const user = auth.currentUser;
    get(child(ref(database), "tickets")).then((tickets_snapshot) => {
        var tickets = [];
        if (tickets_snapshot.exists()) {
            tickets = Object.values(tickets_snapshot.val());
        }
        for (var i = 0; i < tickets.length; i++) {
            if (tickets[i].author_id === user.uid) {
                var newButton = document.createElement("button");
                newButton.innerHTML = tickets[i].title + "<div class=\"reddot\" style=\"display: " + (tickets[i].answer === "" ? "none" : "block") + ";\"></div>";
                newButton.setAttribute("onclick", "ShowTicket(\"" + tickets[i].title + "\"" + ", " + "\"" + tickets[i].content + "\"" + ", " + "\"" + tickets[i].answer + "\")")
                document.getElementById("tickets-list").appendChild(newButton);
            }
        }
    });
}
window.addEventListener('load', function () {
    setTimeout(() => {
        onAuthStateChanged(auth, (user) => {
            refreshTicketsList();
        });
    }, onAuthStateChanged)
});