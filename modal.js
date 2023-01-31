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
  checkbox: {
    required: "Veuillez sélectionner une option"
  }
}


// Identifier le formulaire grace à son nom et le récupérer
const $form = document.querySelector('form[name="reserve"]');

//Récupérer les différents labels

const $lastName = document.getElementById("last");
const $name = document.getElementById("first");

const $mail = document.getElementById("email");


function validityTextHandler(event) {
  console.log("event: ")
  console.log(event);

  const $errorDescriptor = event.target.nextElementSibling;

  if (event.target.validity.valid) {
    $errorDescriptor.textContent = "";
    $errorDescriptor.style.color = "green";
  } else {
    $errorDescriptor.style.color = "red";
    if (event.target.validity.valueMissing) {
      $errorDescriptor.textContent = errorMessage.text.required; return;
    }
    if (event.target.validity.tooShort) {
      $errorDescriptor.textContent = errorMessage.text.minLength; return;
    }
  }
}

function validityEmailHandler(event) {
  console.log("event.target.valid: ")
  console.log(event);

  const $errorDescriptor = event.target.nextElementSibling;

  if (validateEmail(event.target.value)) {
    $errorDescriptor.textContent = "";
    $errorDescriptor.style.color = "green";
  } else {
    $errorDescriptor.style.color = "red";
    if (event.target.validity.valueMissing) {
      $errorDescriptor.textContent = errorMessage.email.required; return;
    }
    if (!validateEmail(event.target.value)) {
      $errorDescriptor.textContent = errorMessage.email.invalidFormat; return;
    }
  }
}

function validateEmail(email) {
  const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  return emailRegex.test(String(email).toLowerCase());
}

$name.addEventListener('input', validityTextHandler);
$lastName.addEventListener('input', validityTextHandler);
$mail.addEventListener('input', validityEmailHandler);


$form.addEventListener('click', function (event) {
  event.preventDefault();
  console.log("invalid: tapped");

  $name.value = "test";

});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log("submit: tapped");  
});
