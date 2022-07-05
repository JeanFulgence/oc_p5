// Récupération du contenu de l'API
fetch("http://localhost:3000/api/products")
.then(response => response.json())
.then((objectProducts) => {
      console.table(objectProducts); // Création d'un tableau avec les produits dans la console
      kanaps(objectProducts); // Appel de la fonction d'affichage des produits
})
// Création d'un message d'erreur en cas d'échec de la récupération
.catch((error) => {
      document.querySelector(".titles").innerHTML = "<h1>Erreur 404</h1>"; //Insertion d'un titre "Erreur 404"
      console.log("Erreur 404 sur ressource API:" + error) //Affichage de l'erreur dans la console
});

// Fonction d'affichage des produits dans l'index
const kanaps = (index) => {
  // Variable de la zone d'article
  let articleZone = document.querySelector("#items");
  // Boucle pour chaque article dans l'index
  for (let article of index) {
    // Création de la zone d'article dans l'index, avec un lien vers le produit (chemin du produit associé à son id)
    articleZone.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}