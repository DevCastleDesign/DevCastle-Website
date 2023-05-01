import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

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


const input = document.getElementById("test-file");



document.getElementById('sendButton').addEventListener('click', (e) => {
    const metadata = {
        customMetadata: {
            "nom:": "nom image"
        }
    }
    const user = auth.currentUser;


    for (let i = 0; i < input.files.length ; i++) {

        const selectedfile = input.file[i];
        const [imageFile] = selectedfile;

        uploadBytes(ref(storage, "users/" + user.uid + "/" + imageFile.name), imageFile, metadata).then(() => {
            alert(imageFile.name)
        });

    }

});

