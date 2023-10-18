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
const closeX = document.querySelector(".close");

// Réinitialisation du formulaire après fermeture de la modale
function resetForm() {
  document.querySelector('form[name="reserve"]').style.display = "block";
  document.getElementById("message").style.display = "none";
  // Réinitialise les champs du formulaire après fermeture de la modale
  document.getElementById("first").value = "";
  document.getElementById("last").value = "";
  document.getElementById("email").value = "";
  document.getElementById('birthdate').value="";
  document.getElementById("quantity").value = "";
  const locations = document.querySelectorAll('input[name="location"]');
  locations.forEach(location => location.checked = false);
  document.getElementById("checkbox1").checked = false;
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
  });
}
closeModal();

//Validation du formulaire
function validateForm(event) {
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
  // Validation = true
  const valid = true;
  //Si le prénom a moins de 2 caractères, formulaire non valide
  if (firstName.length < 2 || firstName.trim() === "") {
      valid = false;
  }
  //Si le nom a moins de 2 caractères, formulaire non valide
  if (lastName.length < 2 || lastName.trim() === "") {
      valid = false;
  }
  //Si l'adresse électronique n'est pas valide (function isValidEmail), formulaire non valide
  if (!isValidEmail(email)) {
      valid = false;
  }
  // Si la date de naissance n'est pas renseignée, formulaire non valide
  if (birthDate.trim()=== "") {
      valid = false;
  }
  // Si vide ou nombre < 0 ou nombre > 99, formulaire non valide
  if (isNaN(quantity) || quantity < 0 || quantity > 99) {
      valid = false;
  }
  // Si une localité n'est pas checkée, formulaire non valide
  if (!location) {
      valid = false;
  }
  // Si la coche CU n'est pas checkée,  formulaire non valide
  if (!checkbox1.checked) {
      valid = false;
  }
  if (valid) {
    // Si le formulaire est valide, masquage du formulaire et affichage du message de validation.
    document.querySelector('form[name="reserve"]').style.display = "none";
    document.getElementById("message").style.display = "flex";
  }
}
//Vérification si chaîne de caractères email correspond à un format valide avec une expression régulière regex
function isValidEmail(email) {
  //Correspondance caractères alphanumériques
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //méthode test() renvoie true si la correspondance est trouvée
  return emailRegex.test(email);
}












