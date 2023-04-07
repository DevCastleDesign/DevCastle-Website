
function checkNom() {
    if (document.getElementById('nomSignIn').value != "") {
        document.getElementById('errorNom').style.display = "none";
        return true;
    } else {
        document.getElementById('errorNom').style.display = "block";
        return false;
    }
};

function checkPrenom() {
    if (document.getElementById('prenomSignIn').value != "") {
        document.getElementById('errorPrenom').style.display = "none";
        return true;
    } else {
        document.getElementById('errorPrenom').style.display = "block";
        return false;
    }
};

function checkTel() {
    if (document.getElementById('telSignIn').value != "") {
        document.getElementById('errorTel').style.display = "none";
        return true;
    } else {
        document.getElementById('errorTel').style.display = "block";
        return false;
    }
};


const emailPatern = /^[^@]+@\w+(\.\w+)+\w$/;
function checkEmail() {
    if (document.getElementById('emailSignIn').value.match(emailPatern)) {
        document.getElementById('errorEmail').style.display = "none";
        return true;
    } else {
        document.getElementById('errorEmail').style.display = "block";
        return false;
    }
};

var passwordValid = false
function checkPassword() {
    if (document.getElementById('passwordSignIn').value.length >=3) {
        document.getElementById('errorPassword').style.display = "none";
        return true;
    } else {
        document.getElementById('errorPassword').style.display = "block";
        return false;
    }
};

function confirmPasswordWalid() {
    if (document.getElementById('passwordSignIn').value == document.getElementById('confirmPasswordSignIn').value) {
        document.getElementById('errorconfPassword').style.display = "none";
        return true
    } else {
        document.getElementById('errorconfPassword').style.display = "block";
        return false;
    }
};


