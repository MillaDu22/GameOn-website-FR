function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
editNav();
// Fonction pour rendre actif le bouton cliqué
const buttons = document.querySelectorAll('.btnFilter');
function activeBtn(e) {
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
}
buttons.forEach(btn => {
    btn.addEventListener('click', activeBtn);
});

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeX = document.querySelector(".close");
const closeBtnMsg = document.querySelector(".btn-close");

// Réinitialisation du formulaire après fermeture de la modale
function resetForm(){
  document.querySelector('form[name="reserve"]').style.display = "block";
  document.getElementById("message").style.display = "none";
  // Réinitialisation des champs du formulaire après fermeture de la modale
  document.getElementById("first").value = "";
  document.getElementById("last").value = "";
  document.getElementById("email").value = "";
  document.getElementById('birthdate').value="";
  document.getElementById("quantity").value = "";
  const locations = document.querySelectorAll('input[name="location"]');
  locations.forEach(location => location.checked = false);
  document.getElementById("checkbox1").checked = false;
  resetErrors();

  // Réinitialisation du message de confirmation
  const confirmationMessage = document.querySelector('.validation-message');
  if (confirmationMessage) {
    confirmationMessage.remove();
  }

}

function resetErrors() {
  const errorMessages = document.querySelectorAll('.error-msg');
  errorMessages.forEach(message => message.style.display = 'none');
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  resetForm(); // Réinitialise le formulaire avant de l'afficher
  modalbg.style.display = "block";
}

// Close modal form with X
function closeModal() {
  closeX.addEventListener('click', function(e) {
    e.preventDefault();
    modalbg.style.display="none";
    resetForm();
  });
}
closeModal();

//Close msg with button
function closeMsg() {
  closeBtnMsg.addEventListener('click', function(e) {
    e.preventDefault();
    modalbg.style.display="none";
    closeBtnMsg.style.display="none";
    resetForm();
  });
}
closeMsg();


//Validation du formulaire
function validateForm(event) {
  resetErrors();
  // Empêche la soumission du formulaire pour éviter la fermeture de la modale
  event.preventDefault(); 
  // Les éléments du DOM
  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const birthDate = document.getElementById('birthdate').value;
  const quantity = document.getElementById("quantity").value;
  const location = document.querySelector('input[name="location"]:checked');
  const checkbox1 = document.getElementById("checkbox1");

// Creation des messages d'erreurs
  const errorFirst = document.createElement('p');
  errorFirst.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
  errorFirst.classList.add('error-msg');
  const messageErrorFirst = document.getElementById('error-first');
  messageErrorFirst.appendChild(errorFirst);
  console.log(errorFirst)

  const errorLast = document.createElement('p');
  errorLast.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  errorLast.classList.add('error-msg');
  const messageErrorLast = document.getElementById('error-last');
  messageErrorLast.appendChild(errorLast);

  const errorEmail = document.createElement('p');
  errorEmail.textContent = "Veuillez entrer une adresse e-mail valide.";
  errorEmail.classList.add('error-msg');
  const messageErrorEmail = document.getElementById('error-email');
  messageErrorEmail.appendChild(errorEmail);

  const errorBirthdate = document.createElement('p');
  errorBirthdate.textContent = "Vous devez entrer votre date de naissance";
  errorBirthdate.classList.add('error-msg');
  const messageErrorBirthdate = document.getElementById('error-birthdate');
  messageErrorBirthdate.appendChild(errorBirthdate);

  const errorQuantity = document.createElement('p');
  errorQuantity.textContent = "Vous devez entrer un nombre entre 0 et 99.";
  errorQuantity.classList.add('error-msg');
  const messageErrorQuantity = document.getElementById('error-quantity');
  messageErrorQuantity.appendChild(errorQuantity);

  const errorLocation = document.createElement('p');
  errorLocation.textContent = "Vous devez choisir une localité";
  errorLocation.classList.add('error-msg');
  const messageErrorLocation = document.getElementById('error-location');
  messageErrorLocation.appendChild(errorLocation);

  const errorCU = document.createElement('p');
  errorCU.textContent = "Vous devez vérifier que vous acceptez les termes et conditions.";
  errorCU.classList.add('error-msg');
  const messageErrorCU = document.getElementById('error-CU');
  messageErrorCU.appendChild(errorCU);

  // Validation = true
  let valid = true;
  //Si le prénom a moins de 2 caractères, formulaire non valide
  if (firstName.length < 2 || firstName.trim() === "") {
      messageErrorFirst.style.display="flex";
      valid = false;
  } else {
    messageErrorFirst.style.display="none";
  }
  //Si le nom a moins de 2 caractères, formulaire non valide
  if (lastName.length < 2 || lastName.trim() === "") {
      messageErrorLast.style.display="flex";
      valid = false;
  } else {
    messageErrorLast.style.display="none";
  }
  //Si l'adresse électronique n'est pas valide (function isValidEmail), formulaire non valide
  if (!isValidEmail(email)) {
      messageErrorEmail.style.display="flex";
      valid = false;
  } else {
    messageErrorEmail.style.display="none";
  }
  // Si la date de naissance n'est pas renseignée, formulaire non valide
  if (birthDate.trim()=== "") {
      messageErrorBirthdate.style.display="flex";
      valid = false;
  } else {
    messageErrorBirthdate.style.display="none";
  }
  // Si vide ou nombre < 0 ou nombre > 99, formulaire non valide
  if (quantity === "" || isNaN(quantity) || quantity < 0 || quantity > 99) {
      messageErrorQuantity.style.display="flex";
      valid = false;
  } else {
    messageErrorQuantity.style.display="none";
  }
  // Si une localité n'est pas checkée, formulaire non valide
  if (!location) {
      messageErrorLocation.style.display="flex";
      valid = false;
  } else {
    messageErrorLocation.style.display="none";
  }
  // Si la coche CU n'est pas checkée,  formulaire non valide
  if (!checkbox1.checked) {
      messageErrorCU.style.display="flex";
      valid = false;
  } else {
    messageErrorCU.style.display="none";
  }
  if (valid) {
    // Création du message de conformation d'inscription dans la div id messages
    const validationMessage = document.createElement('div');
    validationMessage.textContent = "Merci! Votre réservation a bien été enregistrée.";
    validationMessage.classList.add('validation-message');

    // Si le formulaire est valide, masquage du formulaire et affichage du message de validation.
    document.querySelector('form[name="reserve"]').style.display = "none";
    const modalBody = document.querySelector('.modal-body');
    modalBody.appendChild(validationMessage);
    document.querySelector('.btn-close').style.display="block";
  }
}
validateForm();

//Vérification si chaîne de caractères email correspond à un format valide avec une expression régulière regex
function isValidEmail(email) {
  //Correspondance caractères alphanumériques
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //méthode test() renvoie true si la correspondance est trouvée
  return emailRegex.test(email);
}














