// Récupération du formulaire et ajout d'un gestionnaire d'événement pour l'envoi
const form = document.getElementById("login-form");
form.addEventListener("submit", handleLogin);

function handleLogin(event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  // Récupération des valeurs du formulaire
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Création de l'objet à envoyer dans la requête
  const requestBody = {
    email: email,
    password: password
  };

  // Envoi de la requête à l'API avec fetch
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Les identifiants ne sont pas valides");
    }
  })
  .then(data => {
    // Stockage du token dans le localstorage
    localStorage.setItem("token", data.token);
    // Redirection vers la page index.html
    window.location.href = "index.html";
  })
  .catch(error => {
    alert(error.message); // Affichage du message d'erreur en utilisant une fenêtre d'alerte
    console.error(error);
  });
}



