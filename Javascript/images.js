import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

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

const iconInput = document.getElementById("site-icon");
iconInput.addEventListener("change", (event) => {
    const user = auth.currentUser;
    const selectedfile = event.target.files;
    if (selectedfile.length > 0) {
        const [imageFile] = selectedfile;
        uploadBytes(ref(storage, "users/" + user.uid + "/icon/" + imageFile.name), imageFile).then(() => {
            console.log('Uploaded a file (' + imageFile.name + ')!');
        });
    }
});

const input = document.getElementById("site-images");
input.addEventListener("change", (event) => {
    const user = auth.currentUser;
    const selectedfile = event.target.files;
    for (let i = 0; i < selectedfile.length; i++) {
        const imageFile = selectedfile[i];
        uploadBytes(ref(storage, "users/" + user.uid + "/" + imageFile.name), imageFile).then(() => {
            if (i >= selectedfile.length - 1) {
                updateSiteImages();
            }
        });
    };
});

function updateSiteImages() {
    console.log("updating");
    const user = auth.currentUser;
    document.getElementById("site-images-cont").innerHTML = "";
    listAll(ref(storage, "users/" + user.uid)).then((res) => {
        res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then((url) => {
                getMetadata(itemRef).then((metadata) => {
                    document.getElementById("site-images-cont").innerHTML += `
                    <div class="site-images-elem">
                        <img src="` + url + `">
                        <div>
                            <p>` + metadata.name + `</p>
                            <button><img src="src/Icons/TrashIcon.png"></button>
                        </div>
                    </div>
                    `;
                });
            })
        });
    });
}
onAuthStateChanged(auth, updateSiteImages);