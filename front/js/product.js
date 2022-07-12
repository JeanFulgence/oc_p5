// Récupération de l'id via l'URL, puis affichage dans la console
let idKanap = (new URL(document.location)).searchParams.get("_id");
console.log(idKanap)

// Récupération du produit dont on a besoin
fetch("http://localhost:3000/api/products/" + idKanap)
// Renvoi des informations du produit
.then((response) => response.json()
// Définition de l'objet article puis appel de la fonction d'affichage du produit
.then((article) => displayProduct(article))
// Création d'un message d'erreur en cas d'échec de la récupération
.catch(error => {
      //Insertion d'un titre "Erreur 404"
      document.querySelector(".item").innerHTML = "<h1>Erreur 404</h1>"; 
      
      //Affichage de l'erreur dans la console
      console.log("Erreur 404 sur ressource API:" + error)
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
      console.log("Article affiché.")

      addToCart(article)
}

// Fonction de récupération/création d'un panier
function getCart() {
      let cart = localStorage.getItem("cart");

      // Crée un panier s'il n'existe pas
      if (cart == null) {
            return [];

      // Récupère le panier existant
      } else {
      return JSON.parse(cart);
      }
}    

// Fonction de sauvegarde du panier dans le localStorage
function saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
}

// Fonction d'ajout d'un article au panier
function addToCart(article) {

      let cart = getCart()

      // Déclaration de la variable et de l'évènement d'ajout au panier au clic sur le bouton "Ajouter au panier"
      let selectedArticle = document.getElementById("addToCart");
      selectedArticle.addEventListener("click", () => {

            // Déclaration d'une variable pour choisir la couleur de l'article via le menu déroulant de la page
            let selectedColor = document.getElementById("colors");
            article.color = selectedColor.value;

            // Déclaration d'une variable pour saisir la quantité de l'article dans le champ attribué dans la page
            let selectedQuantity = document.getElementById("quantity");
            article.quantity = +selectedQuantity.value;

            // Déclaration d'un array "itemInCart", qui définit les valeurs d'un article ajouté au panier: id, couleur et quantité
            let itemInCart = [
            id = idKanap,
            color = selectedColor.value,
            qty = +selectedQuantity.value 
            ]

            // Affichage d'un message si les valeur de couleur et de quantité ne sont pas définies correctement
            if (selectedQuantity.value <= 0 || selectedQuantity.value > 100 || selectedColor.value === "") {

                  alert("Pour ajouter un article dans votre panier, veuillez choisir une couleur et saisir une quantité entre 1 et 100.")
                  console.log("Couleur/quantité de l'article incorrecte.")

            /* Indication de la présence d'un article identique dans le panier, puis incrémentation de celui-ci
            } else if () {

                  alert("Attention, vous avez déjà ajouté " + article.name + " à votre panier.")
                  cart.push(itemInCart.qty += selectedQuantity.value);
                  saveCart(cart);
                  console.log(cart);*/
            
            // Ajout de l'article au panier, et sauvegarde du panier
            } else {
                  cart.push(itemInCart);
                  saveCart(cart);
                  alert(article.name + " a été ajouté à votre panier")
                  console.log(cart);
            }
      })
}