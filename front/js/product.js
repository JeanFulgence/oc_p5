// Récupération de l'id via l'URL, puis affichage dans la console
let idKanap = (new URL(document.location)).searchParams.get("_id");
console.log(idKanap);

// Récupération du produit dont on a besoin via l'URL + l'id du produit
fetch("http://localhost:3000/api/products/" + idKanap)

// Renvoi des informations du produit
.then((response) => response.json()

// Définition de l'objet article puis appel de la fonction d'affichage du produit
.then((article) => displayProduct(article))

// Création d'un message d'erreur en cas d'échec de la récupération
.catch(error => {

      //Insertion d'un titre "Erreur 404"
      document.getElementById("item").innerHTML = "<h1>Erreur 404</h1>"; 
            
      //Affichage de l'erreur dans la console
      console.log("Erreur 404 sur ressource API:" + error)
}));

// Fonction d'affichage du produit
function displayProduct(article) {

      // Récupération la classe "item__img" et lui ajoute une image avec l'url
      const item__img = document.getElementsByClassName("item__img");
      item__img[0].innerHTML = "<img src=" + article.imageUrl + " alt=" + article.altTxt + "></img>";

      // Récupération l'élément avec l'id title et lui a ajoute le nom associé
      const title = document.getElementById('title');
      title.innerText = article.name;

      // Récupération l'élément avec l'id price et lui ajoute le prix associé
      const price = document.getElementById('price');
      price.innerText = article.price;
  
      // Récupération l'élément avec l'id description et lui ajoute la description associée
      const description = document.getElementById('description');
      description.innerText = article.description;

      // Récupération l'élément avec l'id colors et lui ajoute les couleurs associées
      for (let colors of article.colors) {
            let articleColors = document.createElement("option");
            document.querySelector("#colors").appendChild(articleColors);
            articleColors.value = colors;
            articleColors.innerHTML = colors;
      }
      console.log("Article affiché.")

      // Appel de la fonction d'ajout au panier
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

            // Déclaration d'un objet "itemInCart", qui définit les valeurs d'un article ajouté au panier
            let itemInCart = {
                  'id' : idKanap,
                  'color' : selectedColor.value,
                  'quantity' : parseInt(selectedQuantity.value)
            };

            // Déclaration d'une variable cherchant dans le panier un produit dont l'id est identique au produit que l'on veut ajouter
            let foundItem = cart.find(fi => fi.id == article._id && fi.color == selectedColor.value);

            // Affichage d'un message si les valeur de couleur et de quantité ne sont pas définies correctement
            if (selectedQuantity.value <= 0 || selectedQuantity.value > 100 || selectedColor.value === "") {

                  // Affichage d'instructions à destination de l'utilisateur
                  alert("Pour ajouter un article dans votre panier, veuillez choisir une couleur et saisir une quantité entre 1 et 100.");

                  // Affichage d'un message d'erreur dans la console
                  console.log("Couleur/quantité de l'article incorrecte.");

            // Indication de la présence d'un article identique dans le panier, puis incrémentation de celui-ci
            } else if (foundItem != undefined) {
                  
                  // Affichage d'un avertissement à destination de l'utilisateur
                  alert("Attention, vous avez déjà ajouté " + article.name + " à votre panier.");

                  // Ajout de la quantité sélectionnée à la quantité existante
                  let totalQuantity = parseInt(itemInCart.quantity) + parseInt(foundItem.quantity);
                  foundItem.quantity = totalQuantity;
                  
                  // Sauvegarde du panier
                  saveCart(cart);
                  
                  // Affichage du panier dans la console
                  console.log(cart);

            // Ajout de l'article au panier, et sauvegarde du panier
            } else {

                  // Ajout de l'article au panier
                  cart.push(itemInCart);

                  // Sauvegarde du panier
                  saveCart(cart);

                  // Affichage d'un message de confirmation de l'ajout d'un article au panier
                  alert(article.name + " a été ajouté à votre panier!");

                  // Affichage du panier dans la console
                  console.log(cart);
            }
      })
}