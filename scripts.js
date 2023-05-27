const searchForm = document.getElementById('formulaire-de-recherche');
const searchInput = document.getElementById('champ-de-saisie');
const usersTableBody = document.querySelector('#utilisateurs tbody');
const errorMessage = document.getElementById('Erreur');

//Fonction pour afficher  les données des utilisateurs dans le tableau
function AfficherUtilisateurs(users) {

  // Effacer le contenu du tableau existant
      usersTableBody.innerHTML = '';

// Parcours des utilisateurs et création des lignes du tableau
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.username}</td>
          <td>${user.phone}</td>
          <td>${user.email}</td>
        `;
        usersTableBody.appendChild(row);
      });
    }


//requête HTTP GET pour récupérer les données des utilisateurs à partir de l'API JSONPlaceholder en utilisant le point de terminaison /users.
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des utilisateurs.');
    }
    return response.json();
  })
    .then(data => {
    // Affiche tous les utilisateurs au chargement initial
    AfficherUtilisateurs(data);
  

    // écouteur d'événement pour la soumission du formulaire
    searchForm.addEventListener('submit', event => {
      event.preventDefault();
    
    //on récupère la valeur saisie par l'utilisateur
    const searchTerm = searchInput.value.trim().toLowerCase();

  // Effectuer la recherche uniquement si le terme de recherche n'est pas vide
  if (searchTerm !== '') {
    //Filtrer les utilisateurs en fonction du terme de recherche
    const filtrerUtilisateurs = data.filter(user =>
      user.name.toLowerCase().includes(searchTerm)
    );

    //Effacer le contenu du tableau existant
    usersTableBody.innerHTML = '';

    // Affiche les utilisateurs filtrés dans le tableau
    AfficherUtilisateurs(filtrerUtilisateurs);
  }else {
    // Si le champ de recherche est vide, afficher tous les utilisateurs
    AfficherUtilisateurs(data);
  }
}
  )})
.catch((error) => {
  // Gérer les erreurs de la requête
  console.error('Erreur lors de la recherche :', error);
  errorMessage.textContent = 'Il n\'existe aucun utilisateur de ce nom.';
});

    // Point de terminaison fictif pour la recherche
    const fakeEndpoint = 'https://exemple.com/';

    // Construire l'URL de la requête en incluant le terme de recherche
    const searchUrl = `${fakeEndpoint}?q=${encodeURIComponent(searchInput.value)}`;

    /*Utilise une requête HTTP GET pour effectuer la recherche en envoyant les données
    saisies par l'utilisateur à un point de terminaison fictif*/
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        // Traiter les données de recherche
        console.log(data);
      })
      

   
   

//Utilisez une requête HTTP POST pour simuler la création d’un utilisateur.
// Créer un nouvel utilisateur (simulé)
const nouvelUtilisateur = {
  name: "John Doe",
  username: "johndoe",
  email: "johndoe@example.com",
  phone:"91654852"
};

// Effectuer la requête HTTP POST
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(nouvelUtilisateur),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then(response => response.json())
  .then(data => {
    console.log("Utilisateur créé avec succès :", data);
  })
  .catch(error => {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    errorMessage.textContent = 'Une erreur s\'est produite lors de la création de l\'utilisateur.';
  });

