function init() {
    import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
    import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
    import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

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
    const auth = getAuth();
    const database = getDatabase(app);
}