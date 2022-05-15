 function createModal() {
    const modal = document.createElement('div');
    modal.classList.add('vmodal');
    modal.id = "myModal";
    let wrapper = document.createElement('div');
    wrapper.classList.add('dws-wrapper');
    modal.append(wrapper);
    const dwsForm = document.createElement('div');
    dwsForm.classList.add('dws-form');
    wrapper.append(dwsForm);
    const form = document.createElement('form');
    form.classList.add('tab-form');
    dwsForm.append(form);
    const iClose = document.createElement('i');
    iClose.classList.add('close', 'fa-solid', 'fa-square-xmark', 'fa-2x');
    iClose.id = 'closeBtn';
    form.append(iClose);
    const signUpLabel = document.createElement('label');
    signUpLabel.classList.add('lbl-sign-up', 'active');
    signUpLabel.textContent = 'Sign Up';
    form.append(signUpLabel);

    let divInput = document.createElement('div');
    divInput.classList.add('text-input');
    divInput.textContent = 'Username';
    form.append(divInput);
    const nameInput = document.createElement('input');
    nameInput.classList.add('input');
    nameInput.placeholder = 'Type your name';
    nameInput.type = 'text';
    nameInput.id = 'nameInput';
    form.append(nameInput);
    let incorr = document.createElement('div');
    incorr.classList.add('incorrect');
    incorr.id = 'incName';
    incorr.textContent = 'Incorrect username!';
    form.append(incorr);

    divInput = document.createElement('div');
    divInput.classList.add('text-input');
    divInput.textContent = 'Email';
    form.append(divInput);
    const emailInput = document.createElement('input');
    emailInput.classList.add('input');
    emailInput.placeholder = 'Type your email';
    emailInput.type = 'email';
    emailInput.id = 'emailInput';
    form.append(emailInput);
    incorr = document.createElement('div');
    incorr.classList.add('incorrect');
    incorr.id = 'incEmail';
    incorr.textContent = 'Incorrect email!';
    form.append(incorr);

    divInput = document.createElement('div');
    divInput.classList.add('text-input');
    divInput.textContent = 'Password';
    form.append(divInput);
    const passInput = document.createElement('input');
    passInput.classList.add('input');
    passInput.placeholder = 'Type password';
    passInput.type = 'password';
    passInput.id = 'passInput';
    form.append(passInput);
    incorr = document.createElement('div');
    incorr.classList.add('incorrect');
    incorr.id = 'incPass';
    incorr.textContent = 'Password is too short.';
    form.append(incorr);

    divInput = document.createElement('div');
    divInput.classList.add('text-input');
    divInput.textContent = 'Phone Number';
    form.append(divInput);
    const phoneInput = document.createElement('input');
    phoneInput.classList.add('input');
    phoneInput.placeholder = 'Type your phone number';
    phoneInput.type = 'text';
    phoneInput.id = 'phoneInput';
    form.append(phoneInput);
    incorr = document.createElement('div');
    incorr.classList.add('incorrect');
    incorr.id = 'incPhone';
    incorr.textContent = 'Incorrect phone number!';
    form.append(incorr);

    const signBtn = document.createElement('button');
    signBtn.classList.add('button-class', 'disabled');
    signBtn.id = 'signUp';
    signBtn.textContent = 'Sign Up';
    form.append(signBtn);
    document.body.appendChild(modal);
    return modal;
}

function createSuccessModal() {
    const modal = document.createElement('div');
    modal.classList.add('vmodal');
    modal.id = "myModal";
    let wrapper = document.createElement('div');
    wrapper.classList.add('dws-wrapper');
    modal.append(wrapper);
    const dwsForm = document.createElement('div');
    dwsForm.classList.add('dws-form');
    wrapper.append(dwsForm);
    const form = document.createElement('form');
    form.classList.add('tab-form');
    dwsForm.append(form);
    const textDiv = document.createElement('div');
    textDiv.textContent = 'Registration completed successfully!';
    textDiv.id = 'success';
    textDiv.classList.add('success');
    form.append(textDiv);
    document.body.appendChild(modal);
    return modal;    
}

const modalSelector = function() {
    const $modal = createModal();
    return {
        open() {
            $modal.style.display = "block";
        },
        close() {
            $modal.style.display = "none";
        },
        destroy() {
            $modal.remove();
        }
    }    
}

const successModalSelector = function() {
    const $successModal = createSuccessModal();
    return {
        open() {
            $successModal.style.display = "block";
        },
        close() {
            $successModal.style.display = "none";
        },
        destroy() {
            $successModal.remove();
        }
    }    
}

let modal = modalSelector();
let successModal = successModalSelector();

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("sign-up") && localStorage.getItem("sign-up") !== "") {
        document.getElementById("first-plan-signUp").style.display = "none";
        document.getElementById("second-plan-signUp").style.display = "none";
        document.getElementById("third-plan-signUp").style.display = "none";
        let liFirst = document.createElement("li");
        liFirst.classList.add("nav-menu-item-welcome");
        liFirst.innerHTML = localStorage.getItem("sign-up");
        document.getElementById("list").prepend(liFirst);
    }
    else {
        document.getElementById("register-btn").classList.remove('hide');
        document.getElementById("sign-in-btn").classList.remove('hide');
    }
});

document.getElementById("first-plan-signUp").onclick = function() {
    modal.open();
}

document.getElementById("second-plan-signUp").onclick = function() {
    modal.open();
}

document.getElementById("third-plan-signUp").onclick = function() {
    modal.open();
}

window.onclick = function (event) {
    if (event.target.className == 'vmodal') {
        modal.close();
        successModal.close();
    }
}

document.getElementById("emailInput").oninput = function () {
    if (!isValidEmail(document.getElementById("emailInput").value)) {
        document.getElementById("incEmail").style.display = "block";
    }
    else {
        document.getElementById("incEmail").style.display = "none";
    }

    validate();
}

document.getElementById("closeBtn").onclick = function () {
    modal.close();
}

document.getElementById("phoneInput").oninput = function () {
    if (!isValidPhone(document.getElementById("phoneInput").value)) {
        document.getElementById("incPhone").style.display = "block";
    }
    else {
        document.getElementById("incPhone").style.display = "none";
    }
    validate();
}

document.getElementById("passInput").oninput = function () {
    if (document.getElementById("passInput").value.length < 6) {
        document.getElementById("incPass").style.display = "block";
    }
    else {
        document.getElementById("incPass").style.display = "none";
    }
    validate();
}

document.getElementById("nameInput").oninput = function () {
    if (!isValidName(document.getElementById("nameInput").value)) {
        document.getElementById("incName").style.display = "block";
    }
    else {
        document.getElementById("incName").style.display = "none";
    }
    validate();
}

function onSignUpButtonClick() {
    let liFirst = document.createElement('li');
    liFirst.classList.add("nav-menu-item-welcome");
    liFirst.textContent = document.getElementById("nameInput").value;
    localStorage.setItem('sign-up', document.getElementById("nameInput").value);
    modal.destroy();
    nextModal.open();
    setTimeout(function () {
        nextModal.destroy();
        document.getElementById("first-plan-signUp").style.display = "none";
        document.getElementById("second-plan-signUp").style.display = "none";
        document.getElementById("third-plan-signUp").style.display = "none";
        document.getElementById("list").prepend(liFirst);
    }, 5000);
}

document.getElementById("first-plan-signUp").onclick = onSignUpButtonClick();
document.getElementById("second-plan-signUp").onclick = onSignUpButtonClick();
document.getElementById("third-plan-signUp").onclick = onSignUpButtonClick();


function validate() {
    if (isValidEmail(document.getElementById("emailInput").value) && isValidPhone(document.getElementById("phoneInput").value) 
        && document.getElementById("passInput").value.length >= 6) {
        if (document.getElementById("signUp").classList.contains("disabled")) {
            document.getElementById("signUp").classList.remove("disabled");
        }
    }
    else {
        if (!document.getElementById("signUp").classList.contains("disabled")) {
            document.getElementById("signUp").classList.add("disabled");
        }
    }
}

function isValidPhone(myPhone) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(myPhone);
}

function isValidEmail(myEmail) {
    return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(myEmail);
}

function isValidName(myName) {
    return /^[a-zA-Z ]+$/.test(myName);
}
