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
}

// Close modal button
const $crossButton = document.querySelector(".close");
$crossButton.addEventListener('click', function () {
  modalbg.style.display = 'none';
});



//
// (1) Lier les labels aux entrées dans le HTML en utilisant les attributs "for" et "id" dans le code existant. Corriger le code HTML quand nécessaire.
// (2) Utiliser du JavaScript pur (pas de jQuery) pour terminer le formulaire :

// Le formulaire doit être valide quand l'utilisateur clique sur "Submit"
// Les données doivent être saisies correctement :
// (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
// (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
// (3) L'adresse électronique est valide.
// (4) Pour le nombre de concours, une valeur numérique est saisie.
// (5) Un bouton radio est sélectionné.
// (6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.
// Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation.

//Objet qui sert à stocker les messages d'erreurs selon le type de l'input

const errorMessage = {
  text: {
    required: "Ce champ est obligatoire",
    minLength: "Ce champ doit contenir au moins 2 caractères"
  },
  email: {
    required: "Vous devez renseigner une adresse mail",
    invalidFormat: "Ceci n'est pas une adresse mail valide"
  },
  number: {
    required: "Voud devez renseigner une valeur",
    invalidFormat: "Vous devez saisir une valeur numérique"
  },
  date: {
    required: "Vous devez renseigner votre date de naissance",
    impossible1: "Techniquement, vous ne pouvez pas être né avant 1907",
    impossible2: "Vous devez être né avant aujourd'hui"
  },
  checkbox: {
    required: "Veuillez sélectionner une option"
  }, mca: {
    required: "Vous devez accepter les conditions générales"
  }
}


// Identifier le formulaire grace à son nom et le récupérer
const $form = document.querySelector('form[name="reserve"]');

//Récupérer les différents labels du formulaire
const $lastName = document.getElementById("last");
const $name = document.getElementById("first");

const $mail = document.getElementById("email");

const $date = document.getElementById("birthdate");

const $mca = document.getElementById("checkbox1");


function checkDate(element) {
  const $errorDescriptor = element.nextElementSibling;

  $errorDescriptor.style.color = "red";

  //Date de naissance de la doyenne de l'humanité
  const oldestDate = new Date(1907, 3, 7);
  const inputDate = new Date(element.value);

  //Si la date est supérieure à la date d'aujourd'hui, on affiche un message d'erreur
  if (inputDate > new Date()) {
    $errorDescriptor.textContent = errorMessage.date.impossible2; return;
  }

  if (inputDate < oldestDate) {
    $errorDescriptor.textContent = errorMessage.date.impossible1; return;
  }

  if (element.validity.valid) {
    $errorDescriptor.textContent = "";
  } else {
    $errorDescriptor.style.color = "red";
    if (element.validity.valueMissing) {
      $errorDescriptor.textContent = errorMessage.date.required; return;
    }
  }
}


function checkTextInput(element) {
  const $errorDescriptor = element.nextElementSibling;

  if (element.validity.valid) {
    $errorDescriptor.textContent = "";
  } else {
    $errorDescriptor.style.color = "red";
    if (element.validity.valueMissing) {
      $errorDescriptor.textContent = errorMessage.text.required; return;
    }
    if (element.validity.tooShort) {
      $errorDescriptor.textContent = errorMessage.text.minLength; return;
    }
  }
}

function validateEmail(email) {
  const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  return emailRegex.test(String(email).toLowerCase());
}

function checkEmail(element) {

  const $errorDescriptor = element.nextElementSibling;

  if (validateEmail(element.value)) {
    $errorDescriptor.textContent = "";
  } else {
    $errorDescriptor.style.color = "red";
    if (element.validity.valueMissing) {
      $errorDescriptor.textContent = errorMessage.email.required; return;
    }
    if (!validateEmail(element.value)) {
      $errorDescriptor.textContent = errorMessage.email.invalidFormat; return;
    }
  }
}

function checkRadioSelected() {
  const $radioButtons = document.querySelectorAll('input[type="radio"]');
  let radioSelected = false;

  $radioButtons.forEach(function (radioButton) {
    if (radioButton.checked) {
      radioSelected = true;
    }
  });

  const $errorDescriptor = document.querySelector(".radioFormValidation");

  if (radioSelected) {
    $errorDescriptor.textContent = "";
  } else {
    $errorDescriptor.style.color = "red";
    $errorDescriptor.textContent = errorMessage.checkbox.required;
  }
}

function checkCheckbox(element) {
  const $errorDescriptor = document.querySelector(".mcaFormValidation");

  if (element.checked) {
    $errorDescriptor.textContent = "";
  } else {
    $errorDescriptor.style.color = "red";
    $errorDescriptor.textContent = errorMessage.mca.required;
  }
}

$form.addEventListener('submit', function (event) {
  console.log("submit: tapped"); 
  event.preventDefault();
  console.log("submit: <after> tapped"); 

  checkTextInput($lastName);
  checkTextInput($name);
  checkEmail($mail);
  checkDate($date);
  checkRadioSelected();
  checkCheckbox($mca);
});