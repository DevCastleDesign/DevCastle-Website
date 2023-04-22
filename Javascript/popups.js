function OpenPopup(name) {
    document.getElementById('popup-blur').style.display = 'block';
    document.querySelector(".popup."+name).style.display = 'block';
}

function ClosePopups() {
    for (var i = 0; i < document.getElementById('popup-blur').childElementCount; i++) {
        document.getElementById('popup-blur').children[i].style.display = 'none';
    }
    document.getElementById('popup-blur').style.display = 'none';
}