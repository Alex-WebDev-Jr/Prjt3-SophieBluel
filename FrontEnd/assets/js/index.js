


////////// Appeler l'API avec fetch pour récupérer les données ////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // --> Sélectionner l'élément du DOM à manipuler
      const gallery = document.querySelector(".gallery");

      data.forEach((work) => {
        const figure = document.createElement("figure"); // Créer un élément figure pour contenir l'image et la légende

        const img = document.createElement("img"); // Créer un élément img pour l'image du travail et définir sa source et son texte alternatif
        img.src = work.imageUrl;
        img.alt = work.title;

        figure.appendChild(img); // Ajouter l'élément img à l'élément figure

        const figcaption = document.createElement("figcaption"); // Créer un élément figcaption pour la légende du projet
        figcaption.textContent = work.title;

        figure.appendChild(figcaption); // Ajouter l'élément figcaption à l'élément figure

        gallery.appendChild(figure); // Ajouter l'élément figure enfant de la galerie d'images // les éléments s'insère à la fin de la liste des enfants dans Gallery
      });
    })
    .catch((error) => {
      console.error(error);
    });
});


/////////////////////////// création du filtre ///////////////////////////////

// --> Appeler l'API avec fetch pour récupérer les données
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // -->  Sélectionner les éléments du DOM à manipuler
      const gallery = document.querySelector(".gallery");
      const filters = document.querySelector("#filters");
      const filterBtns = document.querySelector("#filter-btns");


      // -->  Utiliser un objet Set pour stocker les catégories uniques
      const categories = new Set();
      data.forEach((work) => categories.add(work.category.id));


      // -->  Transformer l'objet Set en tableau
      const uniqueCategories = [...categories];


      // --> Ajouter le bouton "Tous"
      const allBtn = document.createElement("button");
      allBtn.id = "all";
      allBtn.textContent = "Tous"; // Texte affiché sur le bouton "Tous"
      filters.insertBefore(allBtn, filterBtns); // Insérer le bouton "Tous" avant les autres boutons de filtre


      // --> Ajouter un événement click pour afficher tous les projets lorsque le bouton "Tous" est cliqué
      allBtn.addEventListener("click", () => filterWorks(0));

         // --> Vérifier si le token est présent dans le local storage
         if (localStorage.getItem("token")) {
          // Masquer le bouton "Tous"
          const allBtn = document.querySelector("#all");
          allBtn.style.display = "none";
        }

      // --> Créer des boutons de filtre pour chaque catégorie unique
      uniqueCategories.forEach((categoryId) => {
        const btn = document.createElement("button");
        btn.id = categoryId;
        btn.textContent = data.find((work) => work.category.id === categoryId).category.name;
        filterBtns.appendChild(btn);


        // --> Ajouter un événement click à chaque bouton de filtre
        btn.addEventListener("click", () => filterWorks(parseInt(btn.id)));
      });


      // --> Appeler la fonction filterWorks avec argument 0 pour afficher tous les projets au chargement de la page
      filterWorks(0);


      // --> Ajouter un événement click au bouton "Tous" pour afficher tous les projets
      allBtn.addEventListener("click", () => filterWorks(0));


      // --> Définir la fonction filterWorks
      function filterWorks(categoryId) {
        const filteredWorks = categoryId === 0 ? data : data.filter((work) => work.category.id === categoryId);


        gallery.innerHTML = ""; // Effacer tout le contenu HTML de l'élément avec l'ID "gallery"


        filteredWorks.forEach((work) => {
          const figure = document.createElement("figure"); // Créer un élément figure pour contenir l'image et la légende


          const img = document.createElement("img"); // Créer un élément img pour l'image du travail et définir sa source et son texte alternatif
          img.src = work.imageUrl;
          img.alt = work.title;


          figure.appendChild(img); // Ajouter l'élément img à l'élément figure


          const figcaption = document.createElement("figcaption"); // Créer un élément figcaption pour la légende du projet
          figcaption.textContent = work.title;


          figure.appendChild(figcaption); // Ajouter l'élément figcaption à l'élément figure


          gallery.appendChild(figure); // Ajouter l'élément figure avec toutes ses enfants à la galerie d'images
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

///////////////////////////récup le formulaire de connexion ///////////////////////////////////

const loginLink = document.getElementById("loginLink");
loginLink.addEventListener("click", () => {
  window.location.href = "./connexion.html";
});



////////////////////////////////// admin ////////////////////////////////////////////

////// --> Mettre à jour le texte du lien de connexion en fonction de l'état de connexion

// Vérifier si le token est présent dans le local storage
if (localStorage.getItem("token")) {
  // Mettre à jour le texte du lien de connexion
  loginLink.textContent = "Logout";
  // Ajouter la classe CSS pour indiquer que l'utilisateur est connecté
  loginLink.classList.add("connected");
  
  // Ajouter un événement "click" sur le lien de connexion pour rediriger l'utilisateur vers la page index.html lorsqu'il se déconnecte
  loginLink.addEventListener("click", function() {
    // Supprimer le token du local storage
    localStorage.removeItem("token");
    // Rediriger l'utilisateur vers la page index.html
    window.location.href = "index.html";
  });
} else {
  // Mettre à jour le texte du lien de connexion
  loginLink.textContent = "Login";
  // Supprimer la classe CSS pour indiquer que l'utilisateur est déconnecté
  loginLink.classList.remove("connected");
}

////// --> Mettre à jour le top bar & modifier en fonction de l'état de connexion

// Vérifier si le token est présent dans le local storage
if (localStorage.getItem("token")) {
  // Afficher la top-bar
  var topBarDiv = document.querySelector(".top-bar");
  topBarDiv.style.display = "block";
}

// Vérifier si le token est présent dans le local storage
if (localStorage.getItem("token")) {
  // Afficher portraitmodif
  var portraitmodif = document.querySelector(".portraitmodif");
  portraitmodif.style.display = "block";
}

// Vérifier si le token est présent dans le local storage
if (localStorage.getItem("token")) {
  // Afficher projetmodif
  var projetmodif = document.querySelector(".projetmodif");
  projetmodif.style.display = "block";
}

// Vérifier si le token est présent dans le local storage
if (localStorage.getItem("token")) {
  // Masquer le filtre avec l'ID "filter-btns"
  var filterBtns = document.getElementById("filter-btns");
  filterBtns.style.display = "none";
}




/////////////////////////////modal///////////////////////////////////

// Récupération du bouton "Modifier" et de la modale
const modifierProjet = document.getElementById("modifier-projet");
const modalProjet = document.getElementById("modalprojet");


// Fonction pour empêcher la propagation de l'événement "click"
function stopPropagation(event) {
  event.stopPropagation();
}


// Ajout d'un événement "click" sur le bouton "Modifier"
modifierProjet.addEventListener("click", function(event) {
  event.stopPropagation(); // Empêcher la propagation de l'événement
  modalProjet.style.display = "block";
});

// récup classe stopmodal
const stopModal = modalProjet.querySelector(".stopmodal");


//ajout événeent click sur stopmodal pour stopPropagation
stopModal.addEventListener("click", stopPropagation);


// Récupération de la croix pour fermer la modale
const closeModal = document.querySelector('.close-modal');


// Ajout d'un événement "click" sur la croix pour fermer la modale
closeModal.addEventListener("click", function() {
  modalProjet.style.display = "none";
});


// Ajout d'un événement "click" en dehors de la modale pour la fermer
window.addEventListener("click", function(event) {
  if (event.target == modalProjet) {
    modalProjet.style.display = "none";
  }


 // Ajout d'un événement "keydown" pour écouter l'appui sur la touche "Esc / Echap"
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    modalProjet.style.display = "none"; 
  }
});

});




// Récupérer les données de l’API
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      
      const imageContainer = document.querySelector('.image-container');
      imageContainer.innerHTML = ''; // Effacer le contenu précédent




      // Boucler à travers les données pour afficher les images
      data.forEach(item => {
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        const miniFiche = document.createElement('div');
        miniFiche.classList.add('mini-fiche');
        miniFiche.dataset.donnees = item.id; // l’ID de la photo
        miniFiche.appendChild(img);
        miniFiche.innerHTML += `
          <i class="fa-solid fa-trash-can"></i>
          <p class="edit">éditer</p>
        `;
        imageContainer.appendChild(miniFiche);

        // Boucler à travers tous les icônes « fa-trash-can » et ajouter un événement de clic
        const trashIcons = miniFiche.querySelectorAll('.fa-trash-can');
        trashIcons.forEach(function(icon) {
          icon.addEventListener('click', function() {
            
          });
         
        });


        trashIcons.forEach(function(icon) {
          icon.addEventListener('click', function() {
            const miniFiche = icon.closest('.mini-fiche');
            const id = miniFiche.dataset.donnees;
            deletePhoto(id);
          });
        });


      });
    });


    function deletePhoto(id) {
      const url = `http://localhost:5678/api/works/${id}`;
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if (response.ok) {
          
        } else {
          throw new Error('Erreur lors de la suppression de la photo');
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
    

    

///////////////////////// afficher le formulaire /////////////
const addPhotoBtn = document.querySelector('.add-photo-btn');
const photoForm = document.querySelector('#photo-form');
const deleteGallery = document.querySelector('.delete-gallery');
const titleModal = document.querySelector('#titlemodal');
const imageContainer = document.querySelector('.image-container');
const separator = document.querySelector('.separator');
const annulModal = document.querySelector('.annul-modal'); //fleche


addPhotoBtn.addEventListener('click', function() {
  addPhotoBtn.style.display = 'none';
  deleteGallery.style.display = 'none';
  titleModal.style.display = 'none';
  separator.style.display = 'none';
  photoForm.style.display = 'block';
  imageContainer.classList.add('hidden'); // Ajout de la classe "hidden" pour le probleme mise en forme des photos.
  annulModal.style.display = 'block'; // Affichage de la flèche
  document.querySelector('#photo-form').reset();
});


const closeModalBtn = document.querySelector('.close-modal');

function previewPhoto(event) {
  const file = event.target.files[0]; // Récupère le premier fichier sélectionné dans l'événement.
  const img = document.createElement('img'); // Crée un élément 'img' dans le DOM.

  img.onload = function() { // fonction pour afficher l'image quand elle est chargée.
    const photoContainer = document.getElementById('photo-container'); // Récupère l'élément 'div' qui contiendra l'image.
    photoContainer.innerHTML = '';// Efface tout contenu existant dans l'élément.
    photoContainer.appendChild(img);// Ajoute l'image chargée à l'élément.
  };

  img.src = URL.createObjectURL(file); // Définit la source de l'image à partir du fichier sélectionné.
}


closeModalBtn.addEventListener('click', function() {
  addPhotoBtn.style.display = 'block';
  deleteGallery.style.display = 'block';
  titleModal.style.display = 'block';
  separator.style.display = 'block';
  photoForm.style.display = 'none';
  imageContainer.classList.remove('hidden'); // Suppression de la classe "hidden"
  annulModal.style.display = 'none'; // masquage de la flèche
  document.querySelector('#photo-form').reset();
  document.getElementById('photo-container').innerHTML = `
  <i class="fa-regular fa-image"></i>
  <label for="photo-upload" class="custom-file-upload">+ Ajouter photo</label>
  <input type="file" id="photo-upload" accept=".jpg, .png" onchange="previewPhoto(event)" maxlength="4194304">
  <p>JPG, PNG : 4 Mo max</p>
`;////// suprime la photo upload sur clic de la croix /////


});

///// retour en arrière clic sur la fleche


annulModal.addEventListener('click', function() {
  addPhotoBtn.style.display = 'block';
  deleteGallery.style.display = 'block';
  titleModal.style.display = 'block';
  separator.style.display = 'block';
  photoForm.style.display = 'none';
  imageContainer.classList.remove('hidden');
  annulModal.style.display = 'none'; // mascage de la flèche
  document.querySelector('#photo-form').reset();


  document.getElementById('photo-container').innerHTML = `
  <i class="fa-regular fa-image"></i>
  <label for="photo-upload" class="custom-file-upload">+ Ajouter photo</label>
  <input type="file" id="photo-upload" accept=".jpg, .png" onchange="previewPhoto(event)" maxlength="4194304">
  <p>JPG, PNG : 4 Mo max</p>
`;////// suprime la photo upload sur clic de la fleche /////

});


//////////// envoyer Form => API avec FormData ///////////////////////////////////
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
      data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        document.getElementById('category').appendChild(option);
      });
    })
    .catch(error => console.error(error));




window.addEventListener('load', function() {
  // Sélectionne le bouton "Valider"
  const validerBtn = document.querySelector("#valider2[type='submit']");

  

  // Récupère l'élément d'entrée de fichier pour la photo
  const photo = document.getElementById("custom-file-upload");
  

  // Ajoute un écouteur d'événements "change" à l'élément d'entrée de fichier
  photo.addEventListener('change', function(event) {
    previewPhoto(event);
  });
  

  // Ajoute un écouteur d'événements "click" au bouton "Valider"
  validerBtn.addEventListener('click', function(event) {
    // Empêche l'envoi du formulaire
    event.preventDefault();

    // Récupère les valeurs des champs "title" et "category"
    const title = document.getElementById("title").value;
    
    const category = document.getElementById("category").value;
    

    // Vérifie si une photo a été sélectionnée
    if (photo.value) {
      

      // Crée un objet FormData et ajoute les données du formulaire
      const formData = new FormData();
      formData.append("title", title);
     
      formData.append("category", category);
      
      formData.append("image", photo.files[0], title);
      
      

      

/////////////////// Envoi de la requête POST pour ajouter la photo
// Récupération du token depuis le local storage
const token = localStorage.getItem("token");

// Envoi de la requête POST pour ajouter la photo
fetch("http://localhost:5678/api/works", {
  method: "POST",
  body: formData,
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
.then(response => response.json())
.then(data => {
 
})
.catch(error => console.error(error));

    };
  });
});











