const params = (new URL(document.location)).searchParams;
const idKanap = params.get("_id");
console.log(idKanap);

// Récupération du contenu de l'API
fetch("http://localhost:3000/api/products")
.then(response => response.json())
.then((objectProducts) => {
      kanaps(objectProducts); // Appel de la fonction d'affichage des produits
})
.catch((error) => {
      document.querySelector(".titles").innerHTML = "<h1>Erreur 404</h1>";
      console.log("Erreur 404 sur ressource API:" + error)
});
function kanaps(produit) {
     // Déclaration des variables des éléments
     let titre = document.querySelector("#title");
     let prix = document.querySelector("#price");
     let imageAlt = document.querySelector("article div.item__img");
     let description = document.querySelector("#description");
     let couleurOption = document.querySelector("#colors");
}