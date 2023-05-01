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
input.addEventListener("change", (event) => {
        const user = auth.currentUser;
        const selectedfile = event.target.files;
        if (selectedfile.length > 0) {
            const [imageFile] = selectedfile;
            uploadBytes(ref(storage, "users/" + user.uid + "/" + imageFile.name), imageFile).then(() => {
                console.log('Uploaded a file!');
            });
        }
    });