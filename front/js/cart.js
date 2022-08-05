// Récupération des articles dans le panier via le localStorage
var itemInCart = JSON.parse(localStorage.getItem("cart"));

// Création d'un tableau avec les articles dans le panier
console.table(itemInCart);

// Fonction d'affichage des articles du panier
async function displayCart(index) {
     
     // Vérification de la présence d'article dans le panier
     if (!itemInCart || itemInCart.length == 0) {

          // Insertion d'un message indiquant que le panier est vide
          document.getElementById("cartAndFormContainer").innerHTML = "<h2>Votre panier est vide.<br/>Pourquoi ne pas jeter un oeil <a href='./index.html'>à nos produits?</a></h2>"

          // Affichage du panier existant
     } else {

          //Zone d'affichage du panier
          let cartZone = document.getElementById("cart__items");

          // Boucle pour chaque article dans le panier
          for (let itemInCart of index) {

               // Récupération du produit via l'URL + l'id du produit dans le panier
               fetch("http://localhost:3000/api/products/" + itemInCart.id)

               // Renvoi des informations du produit
               .then((response) => response.json()

               // Définition de l'objet article puis affichage dans le DOM des informations du produit dans le panier
               .then((article) => {

                    // Récupération des valeurs de prix et de quantité qui serviront d'arguments à la fonction cartTotal
                    var quantity = itemInCart.quantity;
                    var price = article.price;

                    // Insertion de la 
                    cartZone.innerHTML += `<article class="cart__item" data-id="${itemInCart.id}" data-color="${itemInCart.color}">
                    <div class="cart__item__img">
                              <img src="${article.imageUrl}" alt="${article.altTxt}">
                    </div>
                    <div class="cart__item__content">
                         <div class="cart__item__content__description">
                         <h2>${article.name}</h2>
                         <p>${itemInCart.color}</p>
                         <p>${price*quantity}€</p>
                         </div>
                         <div class="cart__item__content__settings">
                         <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                         </div>
                         <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                         </div>
                         </div>
                    </div>
                    </article>`;

                    // Appel des fonctions de total et de modification du panier
                    cartTotal(quantity, price);
                    removeFromCart();
                    adjustQuantity();
               }))
          }
     }
}

displayCart(itemInCart);

// Déclaration d'un tableau qui stockera les différents prix des articles
let arrayPrice = [];

// Déclaration d'un tableau qui stockera les différentes quantités des articles
let arrayQuantity = [];

// Fonction d'affichage des totaux
function cartTotal(quantity, price) {

     // Récupération des balises destinées à afficher les totaux
     let totalQuantity = document.getElementById('totalQuantity');
     let totalPrice = document.getElementById('totalPrice');

     // Déclaration des variables de quantité totale et de prix total
     let qtyTotal = 0;
     let priceTotal = 0;

     // Récupération de la quantité selection lors de l'ajout dans le local storage 
     let qtyNumber = parseInt(quantity);

     // Ajout des prix et quantités dans leurs tableaux respectifs
     arrayQuantity.push({qtyNumber});
     arrayPrice.push({price});

     // Boucle pour récupérer les produits
     for (let key in arrayPrice) {

          // Calculs des quantités et prix totaux
          qtyTotal += arrayQuantity[key].qtyNumber;
          priceTotal += (arrayQuantity[key].qtyNumber * arrayPrice[key].price);
          }

     // Insertion des totaux dans le DOM
     totalQuantity.innerHTML = qtyTotal;
     totalPrice.innerHTML = priceTotal;

     console.log("Totaux effectués")
}

// Fonction de suppression d'un produit
function removeFromCart() {

     // Définition du bouton "supprimer"
     let deleteBtn = document.querySelectorAll(".deleteItem");

          // Boucle itérant les occurences du bouton "supprimer"
          for (let i = 0; i < deleteBtn.length; i++) {

               // Ajout d'une écoute sur le bouton "supprimer"
               deleteBtn[i].addEventListener("click", () => {
                    if (window.confirm("Voulez-vous retirer ce produit de votre panier?")) {
                    
                    // Récupération de l'id du produit sur lequel on clique via la propriété dataset associée à la méthode
                    let $id = deleteBtn[i].closest("article").dataset.id;
                    
                    // Récupération de la couleur du produit sur lequel on clique via la propriété dataset associée à la méthode
                    let $color = deleteBtn[i].closest("article").dataset.color;

                    // Conserve les produits ne correspondant pas à l'id et la couleur passées dans la méthode filter
                    itemInCart = itemInCart.filter(it => it.id != $id || it.color != $color);

                    // Sauvegarde du panier modifié
                    localStorage.setItem("cart", JSON.stringify(itemInCart));

                    // Rechargement de la page afin de mettre à jour le panier pour l'utilisateur
                    location.reload();
               }
          })
     }
}

// Fonction d'ajustement de la quantité d'un produit
function adjustQuantity() {

     // Définition du/des champs "Qté"
     let adjustQty = document.querySelectorAll('.itemQuantity')

     // Boucle itérant les occurences du champ "Qté"
     for (let j = 0; j < adjustQty.length; j++) {

          // Ajout d'une écoute sur le champ
          adjustQty[j].addEventListener("change", () => {

               // Récupération de l'id et la couleur du produit via la propriété dataset associée à la méthode closest
               let $id = adjustQty[j].closest("article").dataset.id;
               let $color = adjustQty[j].closest("article").dataset.color;

               // Récupération de la quantité du champ écouté 
               let $qty = parseInt(adjustQty[j].value);

               // Création d'une expression régulière pour s'assurer une saisie numérique dans "Qté"
               let quantityRegex = RegExp("^[0-9]{1,32}$");

               // Si le test de la RegExp échoue, injonction à l'utilisateur
               if (!quantityRegex.test(adjustQty[j].value)) {

                    alert("Veuillez saisir une quantité valide.")
               
               // Si la quantité saisie est 0, on demande à l'utilisateur s'il veut supprimer l'article. Si oui, on joue une version minifiée de la fonction removeFromCart
               } else if (adjustQty[j].value == 0) {
                    if (window.confirm("Voulez-vous retirer ce produit de votre panier?")) {

                         // Conserve les produits ne correspondant pas à l'id et la couleur passées dans la méthode filter
                         itemInCart = itemInCart.filter(it => it.id != $id || it.color != $color);
     
                         // Sauvegarde du panier modifié
                         localStorage.setItem("cart", JSON.stringify(itemInCart));
     
                         // Rechargement de la page afin de mettre à jour le panier pour l'utilisateur
                         location.reload();
                    }
               } else {

                    // Filtre les articles par rapport à l'id et la couleur
                    let itemToAdjust = itemInCart.find(ad => ad.id === $id && ad.color === $color);

                    // Modification de la quantité par rapport à la saisie dans "Qté"
                    itemToAdjust.quantity = $qty;

                    // Sauvegarde du panier modifié
                    localStorage.setItem("cart", JSON.stringify(itemInCart));

                    // Rechargement de la page afin de mettre à jour le panier pour l'utilisateur
                    location.reload();
               }
          })
     }
}

// Création des expressions régulières
let nameRegExp = RegExp("^[A-Za-z- a-z]{2,32}$");
let cityRegExp = RegExp("^[A-Za-z-]{2,60}$")
let addressRegExp = RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let emailRegExp = RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,2}$");

// Création d'une fonction gérant le formulaire
function form() {

     // Ajout du formulaire
     let form = document.querySelector(".cart__order__form");

     // Ajout d'une écoute sur le champ du prénom
     form.firstName.addEventListener('change', () => {
          validFirstName(form.firstName);
     });
 
     // Ajout d'une écoute sur le champ du nom
     form.lastName.addEventListener('change', function() {
          validLastName(form.lastName);
     });
 
     // Ajout d'une écoute sur le champ de l'adresse
     form.address.addEventListener('change', function() {
          validAddress(form.address);
     });
 
     // Ajout d'une écoute sur le champ de la ville
     form.city.addEventListener('change', function() {
          validCity(form.city);
     });
 
     // Ajout d'une écoute sur le champ de l'adresse e-mail
     form.email.addEventListener('change', function() {
          validEmail(form.email);
     });
 
     // validation du prénom
     const validFirstName = (inputFirstName) => {
          let appendedMsg = inputFirstName.nextElementSibling;
 
          if (nameRegExp.test(inputFirstName.value)) {
               appendedMsg.innerHTML = "Ok!";
          } else {
               appendedMsg.innerHTML = "Ce champ est obligatoire.";
          }
     };
 
     // validation du nom
     const validLastName = function(inputLastName) {
         let appendedMsg = inputLastName.nextElementSibling;
 
          if (nameRegExp.test(inputLastName.value)) {
               appendedMsg.innerHTML = "Ok!";
          } else {
               appendedMsg.innerHTML = "Ce champ est obligatoire.";
          }
     };
 
     // validation de l'adresse
     const validAddress = function(inputAddress) {
          let appendedMsg = inputAddress.nextElementSibling;
 
          if (addressRegExp.test(inputAddress.value)) {
               appendedMsg.innerHTML = "Ok!";
          } else {
               appendedMsg.innerHTML = "Ce champ est obligatoire.";
          }
     };
 
     //validation de la ville
     const validCity = function(inputCity) {
          let appendedMsg = inputCity.nextElementSibling;
 
          if (cityRegExp.test(inputCity.value)) {
               appendedMsg.innerHTML = "Ok!";
          } else {
               appendedMsg.innerHTML = "Ce champ est obligatoire.";
          }
     };
 
     //validation de l'email
     const validEmail = function(inputEmail) {
          let appendedMsg = inputEmail.nextElementSibling;
 
          if (emailRegExp.test(inputEmail.value)) {
               appendedMsg.innerHTML = "Ok!";
          } else {
               appendedMsg.innerHTML = "Ce champ est obligatoire.";
          }
     };
}

form();