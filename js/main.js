// Variable
var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");
var signupUser = document.querySelector("#signupUser");
var signupEmail = document.querySelector("#signupEmail");
var signupPassword = document.querySelector("#signupPassword");
var alertBox = document.querySelector("#alert");

var usersList = [];

if (localStorage.getItem("users") !== null) {
    usersList = JSON.parse(localStorage.getItem("users"));
}

function setUserInLocalStorage() {
    localStorage.setItem("users", JSON.stringify(usersList));
}

function clearInputs() {
    signupUser.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
}

function showMessage(message, type) {
    if (alertBox) {
        alertBox.textContent = message;
        alertBox.className = "";
        alertBox.classList.add("fw-semibold", "text-" + type);
    }
}
function cheackUserNameAndEmailSignUp() {
    if (!signupUser || !signupEmail) return false;
    for (var i = 0; i < usersList.length; i++) {
        if (
            signupEmail.value === usersList[i].uEmail ||
            signupUser.value === usersList[i].uName
        ) {
            return false;
        }
    }
    return true;
}
function cheackUserNameAndEmailLogin() {
    if (!loginEmail || !loginPassword) return false;
    for (var i = 0; i < usersList.length; i++) {
        if (
            loginEmail.value === usersList[i].uEmail &&
            loginPassword.value === usersList[i].uPass
        ) {
            localStorage.setItem("uNameLogin", usersList[i].uName);
            return true;
        }
    }
    return false;
}
// signUp 
function signUp() {
    if (!signupUser || !signupEmail || !signupPassword) return;
    var pattern = /[a-zA-Z0-9]{2,}/;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    var userData = {
        uName: signupUser.value,
        uEmail: signupEmail.value,
        uPass: signupPassword.value
    };
    if (cheackUserNameAndEmailSignUp() === false) {
        showMessage("❌ User name or email is already exist", "white");
    } else if (
        userData.uName === "" ||
        userData.uEmail === "" ||
        userData.uPass === ""
    ) {
        showMessage("⚠️ All inputs are required", "white");
    } else if (
        !emailPattern.test(userData.uEmail) ||
        !pattern.test(userData.uName) ||
        !pattern.test(userData.uPass)
    ) {
        showMessage("⚠️ Inputs are not valid", "white");
    } else {
        usersList.push(userData);
        setUserInLocalStorage();
        clearInputs();
        showMessage("✅ Success, Login to your account.", "white");
        setTimeout(function () {
            location.replace("index.html");
        }, 500);
    }
}
// login
function login() {
    if (!loginEmail || !loginPassword) return;

    if (loginEmail.value === "" || loginPassword.value === "") {
        showMessage("⚠️ All inputs are required", "white");
    } else if (cheackUserNameAndEmailLogin() === true) {
        location.replace("home.html");
    } else {
        showMessage("❌ Incorrect email or password", "white");
    }
}
// DOM CONTENT LOADED 
document.addEventListener("DOMContentLoaded", function () {
    var signUpBtn = document.querySelector(".sign-up");
    if (signUpBtn) {
        signUpBtn.addEventListener("click", signUp);
    }
    var loginBtn = document.querySelector(".login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", login);
    }

    // home
    var userName = localStorage.getItem("uNameLogin");
    var welcomeElement = document.getElementById("Welcome");
    var logoutBtn = document.querySelector(".logout");

    if (welcomeElement && userName) {
        welcomeElement.textContent = "Welcome " + userName;
        showMessage("✅ Logged in successfully", "white");
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("uNameLogin");
        });
    }
});
