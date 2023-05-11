import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
    update,
    exists
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
    getAuth,
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

document.getElementById('sendResilisationButton').addEventListener('click', (e) => {
    const user = auth.currentUser;
    if (document.getElementById('textarea').value == "") {
        document.getElementById('errorResilisation').innerHTML = "Remplissez";
    } else {


        exists(ref(database, 'resiliation/' + user.uid), {
            alert(message) {
            }
        });


      //  set(ref(database, 'resiliation/' + user.uid), {
      //      demande: document.getElementById('textarea').value
      //  });

        setTimeout(changePage, 1000)
        function changePage() {
            window.location.href = "confirmResiliation.html"
        }


    }
});