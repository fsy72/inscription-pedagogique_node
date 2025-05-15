const regexMail = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+@ugb\.edu\.sn$/;
const email_login = document.getElementById("email-login");
const password_login = document.getElementById("password-login");
const email_register = document.getElementById("email-register");
const password_register = document.getElementById("password-register");
const password_confirm = document.getElementById("confirm");

function submitLoginForm() {
    const emailUGB = regexMail.test(email_login.value);
    const sizePassword = (password_login.value.length >= 8);

    if(emailUGB) {
        document.getElementById("email-login-error").style.display = "none";
    } else {
        document.getElementById("email-login-error").style.display = "block";
    }
    if(sizePassword) {
        document.getElementById("password-login-error").style.display = "none";
    } else {
        document.getElementById("password-login-error").style.display = "block";
    }
    if(emailUGB && sizePassword) {
        document.getElementById("login").submit();
    }
}

function submitRegisterForm() {
    const emailUGB = regexMail.test(email_register.value);
    const sizePassword = (password_register.value.length >= 8);
    let valide = true;

    if(emailUGB) {
        document.getElementById("email-register-error").style.display = "none";
    } else {
        document.getElementById("email-register-error").style.display = "block";
        valide = false;
    }
    if(sizePassword) {
        document.getElementById("password-register-error").style.display = "none";
        if(password_register.value === password_confirm.value) {
            document.getElementById("password-confirm").style.display = "none";
        } else {
            document.getElementById("password-confirm").style.display = "block";
            valide = false;
        }
    } else {
        document.getElementById("password-register-error").style.display = "block";
        valide = false;
    }
    if(valide) {
        document.getElementById("register").submit();
    }
}

function showRegister() {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}
function showLogin() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

async function incorrectForm() {
    const message = await fetch('/login').then(u => u.json());
    if(message) {
        const messageError = document.getElementById('messageError');
        messageError.innerHTML = message;
    }
}
incorrectForm();