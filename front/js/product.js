// Récupération de l'URL de la page
let params = (new URL(document.location)).searchParams;
// Récupération de l'id via l'URL
let idKanap = params.get("_id");
console.log(idKanap); // Affiche l'id du produit sélectionné

// Récupération du produit dont on a besoin
fetch("http://localhost:3000/api/products/" + idKanap)
// Renvoi des informations du produit
.then((response) => response.json()
// Définition d'article puis appel de la fonction d'affichage du produit
.then((article) => displayProduct(article))
// Création d'un message d'erreur en cas d'échec de la récupération
.catch(error => {
      document.querySelector(".item").innerHTML = "<h1>Erreur 404</h1>"; //Insertion d'un titre "Erreur 404"
      console.log("Erreur 404 sur ressource API:" + error) //Affichage de l'erreur dans la console
}));

// Fonction d'affichage du produit
function displayProduct(article) {
      // Récupère la classe "item__img" et lui ajoute une image avec l'url
      const item__img = document.getElementsByClassName("item__img");
      item__img[0].innerHTML = "<img src=" + article.imageUrl + " alt=" + article.altTxt + "></img>";

      // Récupère l'element avec l'id title et lui a ajoute le nom associer
      const title = document.getElementById('title');
      title.innerText = article.name;

      // Récupère l'element avec l'id price et lui ajoute le prix associer
      const price = document.getElementById('price');
      price.innerText = article.price;
  
      // Récupère l'element avec l'id description et lui ajoute la description associer
      const description = document.getElementById('description');
      description.innerText = article.description;

      // Récupère l'element avec l'id colors et lui ajoute la/les couleur/s associer
      for (let colors of article.colors) {
          let articleColors = document.createElement("option");
          document.querySelector("#colors").appendChild(articleColors);
          articleColors.value = colors;
          articleColors.innerHTML = colors;
      }
      console.log("Article affiché avec succès.")
}

let cart = []