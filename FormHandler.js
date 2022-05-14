modal_window_ext = "<div><button class='button-modal' onclick='CloseModal();'>X</button></div><div class='h2-white'>your data accepted</div>";
var modal_window_node;
const body = document.querySelector("body");


let valid_phone = false;
let valid_mail = false;
let valid_name = false;

let timer_id;

let buttonSubmit = document.querySelector("#form-button");
if (!buttonSubmit )
    buttonSubmit = document.querySelector("#form-button-disabled");

const form = document.querySelector("form");
form.addEventListener("submit", formHandlerSubmit);



function IsValidEmail()
{
    const mailRegEx = /[A-Za-z\d][\w\.-]{2,}@([a-zA-Z]{2,}\.)+[a-zA-Z]{2,3}/;
    const mail = document.querySelector("#form-mail").value;
    let found = mail.match(mailRegEx);

    if (found !== null)
        valid_mail = found[0] === mail;
    else
        valid_mail = false;
    ActivateButton();
}

function ActivateButton()
{
    if (valid_mail && valid_phone && valid_name) {
        buttonSubmit.id = "form-button";
        buttonSubmit.disabled = false;
    }
    else {
        buttonSubmit.id = "form-button-disabled";
        buttonSubmit.disabled = true;
    }
}

function IsValidPhone()
{
    const phoneRegEx = /^(\+|\d)[\d\s-]{6,}/;
    const phone = document.querySelector("#form-phone").value;
    let found = phone.match(phoneRegEx);

    if (found !== null)
        valid_phone = found[0] === phone;
    else
        valid_phone = false;
    ActivateButton();
}

function IsValidName()
{
    const name = document.querySelector("#form-name").value;
    valid_name = name.length >= 1;
    ActivateButton();
}


function formHandlerSubmit(event) {
    event.preventDefault();
    modal_window_node = document.createElement('div');
    modal_window_node.innerHTML = modal_window_ext;
    modal_window_node.id = "modal-window";
    body.appendChild(modal_window_node);

    timer_id = setTimeout(() => {
        body.removeChild(modal_window_node);
    }, 5000);


}

function CloseModal()
{
    clearTimeout(timer_id);
    body.removeChild(modal_window_node);
}
