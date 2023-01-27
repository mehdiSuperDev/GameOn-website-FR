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

var errorMessage = {
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
const $form = document.querySelector("form[name='reserve']");

//Récupérer les différents labels

const $lastName = document.getElementById("last");
const $mail = document.getElementById("email");

function validityTextHandler(event) {
  event.preventDefault();

  // recuperer l'element d'apres et inserer le message d'erreur
  var inputFormValidation = event.target.nextElementSibling;

  console.log(`inputFormValidation: ${inputFormValidation}`);

  if (event.target.validity.valueMissing) {
    inputFormValidation.textContent = errorMessage.text.required;
    inputFormValidation.style.display = "block";
    inputFormValidation.style.color = "red";
  } else if (event.target.validity.tooShort) {
    inputFormValidation.textContent = errorMessage.text.minLength;
    inputFormValidation.style.display = "block";
    inputFormValidation.style.color = "red";
  }
}

const $name = document.getElementById("first");
$name.addEventListener('invalid', validityTextHandler);


$lastName.addEventListener('invalid', validityTextHandler);


// Attacher le handler qui vérifie le nombre de caractère
// dans l'input aux différents labels concernés
// $name.addEventListener('input', inputTextHandler);
// $lastName.addEventListener('input', inputTextHandler);

// function inputTextHandler(event) {
//   if (event.target.value < 2) {
//     console.log(errorMessage.text.minLength);
//   } else {
//     console.log("");
//   }
//   console.log(event.target.value);
// }


// $form.addEventListener('submit', function(event) {
//     event.preventDefault();
//     console.log("submit");
//     // Vérifier si le nom ne comporte pas moins de 2 caractères et n'est pas vide
//     if ($name.value.length < 2 || $name.value === "") {
//       console.log("error name");

//       //recuper l'élement p adjacent au label
//       const $errorName = $name.nextElementSibling;
//       //afficher le message d'erreur
//       $errorName.textContent = errorMessage.text.minLength;
//       // rendre visible le message d'erreur
//       $errorName.style.display = "block";
//     }
// });

$form.addEventListener('submit', function (event) {
  console.log("submit");
  event.preventDefault();

  // boucle sur $name et $lastName
  // for (text in [$name, $lastName]) {
  //   // Vérifier si le nom ne comporte pas moins de 2 caractères et n'est pas vide
  //   if (text.value.length < 2 || text.value === "") {
  //     console.log("error name");

  //     //recuper l'élement p adjacent au label
  //     const $errorName = text.nextElementSibling;
  //     //afficher le message d'erreur
  //     $errorName.textContent = errorMessage.text.minLength;
  //     // rendre visible le message d'erreur
  //     $errorName.style.display = "block";
  //   }
  // }


});

// fonction qui verifie si le champ n'est pas vide et si il comporte au moins 2 caractères
function checkInputText(input) {
  if (input.value.length < 2 || input.value === "") {
    return false;
  } else {
    return true;
  }
}