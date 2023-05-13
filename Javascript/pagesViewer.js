import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

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
const storage = getStorage();

function updateMaquettePages() {
    const user = auth.currentUser;
    document.getElementById("maquettes-pages-viewer").innerHTML = "";
    listAll(ref(storage, "users/" + user.uid + "/maquettes")).then((res) => {
        res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then((url) => {
                getMetadata(itemRef).then((metadata) => {
                    document.getElementById("maquettes-pages-viewer").innerHTML += `
                    <div class="pageViewer">
                        <h2>` + metadata.name.replace(/\.[^/.]+$/, "") + `</h2>
                        <a href="` + url + `" target="_blank"><img id="imageView" src="` + url + `"/></a>
                    </div>
                    `;
                });
            });
        });
    });
}


onAuthStateChanged(auth, updateMaquettePages);
