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

// messages d'erreur associés à différents types de champ de formulaire
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

// Récupération des différents éléments du formulaire HTML
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


/**
 * Vérifie si une chaîne de caractères respecte les conditions de validation
 * @param {string} text - La chaîne de caractères à valider
 * @returns {boolean} - Vrai si la longueur de `text` est supérieure ou égale à 2, faux sinon
 */
const validateText = text => {
  return text.length >= 2;
}


/**
 * Valide une adresse email.
 *
 * @param {string} email - Adresse email à valider.
 * @return {boolean} - Renvoie `true` si l'adresse email est valide, `false` sinon.
 */

const validateEmail = email => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(email);
}

/**
 * Valide une date.
 *
 * @param {string} date - Date à valider.
 * @return {boolean} - Renvoie `true` si la date est valide, `false` sinon.
 */

const validateDate = date => {
  const inputDate = new Date(date);
  return inputDate < new Date() && date !== "";
}


/**
 * Valide une valeur numérique.
 *
 * @param {string} number - Valeur numérique à valider.
 * @return {boolean} - Renvoie `true` si la valeur est numérique, `false` sinon.
 */

const validateNumber = number => {
  return !isNaN(number) && number !== "";
}

/**
 * Valide une option radio.
 *
 * @param {NodeList} radioOptions - Liste des options radio.
 * @return {boolean} - Renvoie `true` si une option est sélectionnée, `false` sinon.
 */

const validateRadio = (options = radioOptions) => {
  return validateOptions(options);
}


/**
 * Valide une ou plusieurs options checkbox.
 *
 * @param {NodeList} checkboxs - Liste des options checkbox.
 * @return {boolean} - Renvoie `true` si une option est sélectionnée, `false` sinon.
 */

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


// tableau qui sert à stocker les différentes erreurs sur les inputs
var formErrors = [];

/**
 * Valide la valeur d'un élément avec un validateHandler.
 * @function
 * @param {function} validateHandler - La fonction de validation à utiliser pour valider la valeur de l'élément.
 * @param {Element} element - L'élément dont la valeur doit être validée.
 * @param {Object} errorMessage - L'objet contenant les messages d'erreur associés aux différents types d'éléments.
 */
const validate = (validateHandler, element, errorMessage) => {
  const isValid = validateHandler(element.value);
  const errorElement = element.nextElementSibling;
  if (!isValid) {
    // Erreur ajoutée au formErros pour vérifier dans la fonction submitFormIfValid(), si il y à des erreurs ou non
    formErrors.push(errorMessage.required);
    element.style.borderWidth = "2px";
    errorElement.textContent = errorMessage.required;
  } else {
    errorElement.textContent = "";
    element.style.borderWidth = "0px";
  }
}

function submitFormIfValid() {
  if (formErrors.length === 0) {
    resetForm();
    hideModalForm();
    showSuccessModal();
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  validate(validateText, lastName, errorMessage.text);
  validate(validateText, firstName, errorMessage.text);
  validate(validateEmail, email, errorMessage.email);
  validate(validateDate, date, errorMessage.date);
  validate(validateNumber, quantity, errorMessage.number);
  validate(validateRadio, radioInput, errorMessage.checkbox);
  validate(validateCheckbox, mca, errorMessage.mca);

  submitFormIfValid();
  // On vide notre tableau d'erreurs
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
});

function showSuccessModal() {
  successModal.style.display = 'block';
}