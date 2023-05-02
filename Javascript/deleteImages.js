let hasToBeDeleted = false;
let URLOfImageToDeleted = "";
let hasIconToBeDeleted = false;

function AddImageToDelete(url) {
    URLOfImageToDeleted = url;
    hasToBeDeleted = true;
}

function DeleteIcon() {
    hasIconToBeDeleted = true;
}