function showModalForm() {
  const modalForm = document.querySelector('.modal-form');
  modalForm.style.display = 'block';
}

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  showModalForm();
}

// Close modal button
const $crossButton = document.querySelector(".close");
$crossButton.addEventListener('click', function () {
  modalbg.style.display = 'none';
});

// Vérification des champs du formulaire

const errorMessage = {
  text: {
    required: "Ce champ ne peut etre vide, et doit comporter au moins 2 caractères"
  },
  email: {
    required: "Vous devez renseigner une adresse mail valide (ex: pseudo@mail.com)"
  },
  number: {
    required: "Voud devez renseigner une valeur numérique"
  },
  date: {
    required: "Vous devez renseigner votre date de naissance, celle ci ne peut pas être supérieure à la date d'aujourd'hui"
  },
  checkbox: {
    required: "Veuillez sélectionner une option"
  }, 
  mca: {
    required: "Vous devez accepter les conditions générales"
  }
}

const form = document.querySelector('form[name="reserve"]');
const lastName = document.getElementById("last");
const firstName = document.getElementById("first");
const email = document.getElementById("email");
const date = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const radioInput = document.getElementById("location6").nextElementSibling;
const radioOptions = document.querySelectorAll('input[type="radio"]');
const mca = document.getElementById("checkbox1").nextElementSibling;
const checkboxs = document.querySelectorAll('input[type="checkbox"]');

const validateText = text => {
  return text.length >= 2;
}

const validateEmail = email => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(email);
}

const validateDate = date => {
  const inputDate = new Date(date);
  return inputDate < new Date() && date !== "";
}

const validateNumber = number => {
  return !isNaN(number) && number !== "";
}

const validateRadio = (options = radioOptions) => {
  return validateOptions(options);
}

const validateCheckbox = (options = checkboxs) => {
  return validateOptions(options);
}

function validateOptions(options) {
  let optionSelected = false;
  options.forEach(function (option) {
    if (option.checked) {
      optionSelected = true;
    }
  });
  return optionSelected;
}

function hasDefaultParameter(fn) {
  return /=.*?\}/.test(fn.toString());
}

var formErrors = [];

const validate = (element, validateHandler, errorMessage) => {
  const error = element.nextElementSibling;
  const isValid = hasDefaultParameter(validateHandler) ? validateHandler() : validateHandler(element.value);
  if (!isValid) {
    formErrors.push(errorMessage.required);
    error.textContent = errorMessage.required;
  } else {
    error.textContent = "";
  }
}

function submitFormIfValid() {
  if (formErrors.length === 0) {
    resetForm();
    hideModalForm();
    showSuccessModal();
    // form.submit();
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  validate(lastName, validateText, errorMessage.text);
  validate(firstName, validateText, errorMessage.text);
  // validate(email, validateEmail, errorMessage.email);
  validate(date, validateDate, errorMessage.date);
  validate(quantity, validateNumber, errorMessage.number);
  validate(radioInput, validateRadio, errorMessage.checkbox);
  validate(mca, validateCheckbox, errorMessage.mca);

  submitFormIfValid();
  formErrors = [];
});

function resetForm() {
  form.reset();
}

function hideModalForm() {
  const modalForm = document.querySelector('.modal-form');
  modalForm.style.display = 'none';
}

const successModal = document.querySelector('.modal-success');

const successModalButton = document.querySelector('.modal-sucess-submit');
successModalButton.addEventListener('click', function () {
  successModal.style.display = 'none';
  $crossButton.click();
  // form.submit();
});

function showSuccessModal() {
  successModal.style.display = 'block';
}