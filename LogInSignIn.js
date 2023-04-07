
function checkNom() {
    if (document.getElementById('nomSignIn').value != "") {
        document.getElementById('errorNom').style.display = "none";
        document.getElementById('nomSignIn').style.border = "1px solid #b8b8b8";
        return true;
    } else {
        document.getElementById('errorNom').style.display = "block";
        document.getElementById('nomSignIn').style.border = "#cd3d64 solid 1.5px";
        return false;
    }
};

function checkPrenom() {
    if (document.getElementById('prenomSignIn').value != "") {
        document.getElementById('errorPrenom').style.display = "none";
        document.getElementById('prenomSignIn').style.border = "1px solid #b8b8b8";
        return true;
    } else {
        document.getElementById('errorPrenom').style.display = "block";
        document.getElementById('prenomSignIn').style.border = "#cd3d64 solid 1.5px";
        return false;
    }
};

function checkTel() {
    if (document.getElementById('telSignIn').value.length >= 10) {
        document.getElementById('errorTel').style.display = "none";
        document.getElementById('telSignIn').style.border = "1px solid #b8b8b8";
        return true;
    } else {
        document.getElementById('errorTel').style.display = "block";
        document.getElementById('telSignIn').style.border = "#cd3d64 solid 1.5px";
        return false;
    }
};


const emailPatern = /^[^@]+@\w+(\.\w+)+\w$/;
function checkEmail() {
    if (document.getElementById('emailSignIn').value.match(emailPatern)) {
        document.getElementById('errorEmail').style.display = "none";
        document.getElementById('emailSignIn').style.border = "1px solid #b8b8b8";
        return true;
    } else {
        document.getElementById('errorEmail').style.display = "block";
        document.getElementById('emailSignIn').style.border = "#cd3d64 solid 1.5px";
        return false;
    }
};


function checkPassword() {
    if (document.getElementById('passwordSignIn').value.length >=6) {
        document.getElementById('errorPassword').style.display = "none";
        document.getElementById('passwordSignIn').style.border = "1px solid #b8b8b8";
        return true;
    } else {
        document.getElementById('errorPassword').style.display = "block";
        document.getElementById('passwordSignIn').style.border = "#cd3d64 solid 1.5px";
        return false;
    }
};

function confirmPasswordWalid() {
    if (document.getElementById('passwordSignIn').value == document.getElementById('confirmPasswordSignIn').value) {
        document.getElementById('errorconfPassword').style.display = "none";
        document.getElementById('confirmPasswordSignIn').style.border = "1px solid #b8b8b8";
        return true
    } else {
        document.getElementById('errorconfPassword').style.display = "block";
        document.getElementById('confirmPasswordSignIn').style.border = "#cd3d64 solid 1.5px";
        return false;
    }
};


function checkEmailLogin() {
    if (document.getElementById('emailLogin').value.match(emailPatern)) {
        document.getElementById('errorEmailLogin').style.display = "none";
        return true;
    } else {
        document.getElementById('errorEmailLogin').style.display = "block";
        return false;
    }
};