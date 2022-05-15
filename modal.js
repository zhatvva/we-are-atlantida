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
    nameInput.placeholder = 'Username';
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
    emailInput.placeholder = 'Email';
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
    divInput.textContent = 'Phone Number';
    form.append(divInput);
    const phoneInput = document.createElement('input');
    phoneInput.classList.add('input');
    phoneInput.placeholder = 'Telephone';
    phoneInput.type = 'text';
    phoneInput.id = 'phoneInput';
    form.append(phoneInput);
    incorr = document.createElement('div');
    incorr.classList.add('incorrect');
    incorr.id = 'incPhone';
    incorr.textContent = 'Incorrect phone number!';
    form.append(incorr);

    const signBtn = document.createElement('button');
    signBtn.classList.add('sign-btn', 'disabled');
    signBtn.id = 'signUp';
    signBtn.textContent = 'Send';
    form.append(signBtn);
    document.body.appendChild(modal);
    return modal;
}

function createNextModal(text, id) {
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
    textDiv.textContent = text;
    textDiv.id = id;
    textDiv.classList.add(id);
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
    const $successModal = createNextModal('Registration completed successfully!','success');
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

const alreadyRegisteredModalSelector = function() {
    const $successModal = createNextModal('You are already registered','alreadyRegistered');
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
let alreadyRegisteredModal = alreadyRegisteredModalSelector();

const openModal = function(){
    if (localStorage.getItem("sign-up") && localStorage.getItem("sign-up") !== "")
    {
        alreadyRegisteredModal.open();
        setTimeout(function () {
            alreadyRegisteredModal.close();
        }, 5000);
    }
    else
    {
        modal.open();
    }
}

document.getElementById("first-plan-signUp").onclick = function() {
    openModal();
}

document.getElementById("second-plan-signUp").onclick = function() {
    openModal();
}

document.getElementById("third-plan-signUp").onclick = function() {
    openModal();
}

window.onclick = function (event) {
    if (event.target.className == 'vmodal') {
        modal.close();
        successModal.close();
        alreadyRegisteredModal.close();
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

document.getElementById("nameInput").oninput = function () {
    if (!isValidName(document.getElementById("nameInput").value)) {
        document.getElementById("incName").style.display = "block";
    }
    else {
        document.getElementById("incName").style.display = "none";
    }
    validate();
}

document.getElementById("signUp").onclick = function () {
    let liFirst = document.createElement('li');
    liFirst.classList.add("nav-menu-item-welcome");
    liFirst.textContent = document.getElementById("nameInput").value;
    localStorage.setItem('sign-up', document.getElementById("nameInput").value);
    modal.destroy();
    successModal.open();
    setTimeout(function () {
        successModal.destroy();
    }, 5000);
}

function validate() {
    if (isValidEmail(document.getElementById("emailInput").value) && isValidPhone(document.getElementById("phoneInput").value)) {
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
