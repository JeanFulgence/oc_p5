// Récupération du contenu de l'API
fetch("http://localhost:3000/api/products")
.then(response => response.json())
.then((objectProducts) => {
      kanaps(objectProducts); // Appel de la fonction d'affichage des produits
})
// Création d'un message d'erreur en cas d'échec de la récupération
.catch((error) => {
      document.querySelector(".item").innerHTML = "<h1>Erreur 404</h1>"; //Insertion d'un titre "Erreur 404"
      console.log("Erreur 404 sur ressource API:" + error) //Affichage de l'erreur dans la console
});

// Récupération de l'URL de la page
const params = (new URL(document.location)).searchParams;
// Récupération de l'id via l'URL
const idKanap = params.get("_id");
console.log(idKanap);

// Fonction d'affichage des produits de l'API
const kanaps = (product) => {
     // Déclaration des variables des éléments
      let itemImg = document.querySelector("article div.item__img");
      let title = document.querySelector("#title");
      let price = document.querySelector("#price");
      let description = document.querySelector("#description");
      let colorSelection = document.querySelector("#colors");
      for (let selection of product) {
            // Si correspondance entre l'id obtenu de l'URL et celle d'un produit, récupération de ses informations dans le tableau
            if (idKanap === selection._id) {
                  // Injection du produit dans la page
                  itemImg.innerHTML = `<img src="${selection.imageUrl}" alt="${selection.altTxt}">`;
                  title.textContent = `${selection.name}`;
                  price.textContent = `${selection.price}`;
                  description.textContent = `${selection.description}`;
                  // Création d'une boucle pour rechercher les couleurs du produit
            for (let color of selection.colors) {
                  colorSelection.innerHTML += `<option value="${color}">${color}</option>`;
                  }
            }
      }
      console.log("Produit affiché");
}

// Définition des variables du choix des couleurs
let colorChoice = document.querySelector("#colors");
// Ajout d'un addEventListener dans l'input de la couleur du produit
colorChoice.addEventListener("input", (ec) => {
      let colorProduct;
      colorProduct = ec.target.value;
      customerProduct.color = colorProduct;
});

// Définition des variables du choix de la quantité
let quantityChoice = document.querySelector('input[id="quantity"]');
let quantityProduct;
// Ajout d'un addEventListener dans l'input de la quantité du produit
quantityChoice.addEventListener("input", (eq) => {
      quantityProduct = eq.target.value;
      customerProduct.quantité = quantityProduct;
});

// Déclaration d'un objet customerProduct pour le panier
let customerProduct = {};
// id du produit affiché
customerProduct._id = idKanap;

// Déclaration de la variable d'ajout au panier
let selectionProduct = document.querySelector("#addToCart");
selectionProduct.addEventListener("click", () => {
      // Conditions de l'ajout au panier
      if (  customerProduct.quantité < 1 ||
            customerProduct.quantité > 100 ||
            customerProduct.quantité === undefined ||
            customerProduct.color === "" ||
            customerProduct.color === undefined) {
            // Création d'une alerte si les paramètres ne sont pas sélectionnés
            alert("Pour ajouter cet article dans votre panier, veuillez choisir une couleur et une quantité valide.");
      } else {
            cart();
            console.log("Ajout dans le panier");
            // Indice d'ajout dans le panier sur la page
            alert("Produit ajouté!");
      }
});

// Déclaration d'un tableau pour initialiser le panier
let customerSelectedProduct = [];
// Déclaration d'un tableau qui contiendra les données du localStorage (cartInMemory)
let savedProduct = [];
// Déclaration d'un tableau qui contiendra un choix d'article et de couleur non effectué
let tempProduct = [];
// Déclaration d'un tableau qui contiendra la concaténation des deux précédents
let productToPush = [];

// Déclaration d'une fonction qui ajoute l'article choisi dans le tableau vide customerProduct
function addFirstProduct() {
      console.log(savedProduct);
      if (savedProduct === null) {
            // Push le produit choisi dans customerProduct
            customerSelectedProduct.push(customerProduct);
            console.log(customerProduct);
            // Envoi de customerSelectedProduct au localStorage sous le nom de cartInMemory
            return (localStorage.cartInMemory = JSON.stringify(customerSelectedProduct));
      }
}

// Fonction ajoutant l'article dans le tableau non vide customerProduct
function addAnother() {
      // Initialise productToPush afin de recevoir les données
      productToPush = [];
      // Push le produit choisi dans customerProduct
      tempProduct.push(customerProduct);
      // Association de tempProduct et savedProduct
      productToPush = [...savedProduct, ...tempProduct];
      // Fonction classant les id et les couleurs
      productToPush.sort(function triage(a, b) {
            if (a._id < b._id) return -1;
            if (a._id > b._id) return 1;
            if (a._id = b._id) {
                  if (a.color < b.color) return -1;
                  if (a.color > b.color) return 1;
            }
            return 0;
      });
      // Vide tempProduct après utilisation
      tempProduct = [];
      // Envoi de productToPush au localStorage sous le nom de cartInMemory
      return (localStorage.cartInMemory = JSON.stringify(productToPush));
}

// Fonction qui ajuste la quantité de produits dans le panier
function cart() {
      // Récupération du localStorage
      savedProduct = JSON.parse(localStorage.getItem("cartInMemory"));
      if (savedProduct) {
            for (let choice of savedProduct) {
                  // Comparateur d'égalité des articles actuellement choisis et ceux déjà choisis
                  if (choice._id === idKanap && choice.color === customerProduct.color) {
                        // Indice ajout d'un même produit
                        alert("Attention, vous avez déjà ajouté cet article!");
                        // Modification de la quantité d'un produit existant dans le panier
                        let additionQuantité = parseInt(choice.quantité) + parseInt(quantityProduct);
                        choice.quantité = JSON.stringify(additionQuantité);
                        // Envoi des nouvelles données
                        return (localStorage.cartInMemory = JSON.stringify(savedProduct));
                  }
            }
            // Appel de addAnother si la boucle ne renvoie pas d'égalité
            return addAnother();
      }
      // Appel de addFirstProduct si savedProduct n'existe pas
      return addFirstProduct();
}