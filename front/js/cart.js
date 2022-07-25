
// Récupération des articles dans le panier via le localStorage
let itemInCart = JSON.parse(localStorage.getItem("cart"));

// Création d'un tableau avec les articles dans le panier
console.table(itemInCart);

// Fonction d'affichage des articles du panier
let displayCart = (index) => {

     //Zone d'affichage du panier
     let cartZone = document.getElementById("cart__items");

     // Boucle pour chaque article dans le panier
     for (let itemInCart of index) {

     cartZone.innerHTML += `<article class="cart__item" data-id="${itemInCart[0]}" data-color="${itemInCart[6]}">
     <div class="cart__item__img">
          <img src="${itemInCart[3]}" alt="${itemInCart[5]}">
     </div>
     <div class="cart__item__content">
          <div class="cart__item__content__description">
          <h2>${itemInCart[1]}</h2>
          <p>${itemInCart[6]}</p>
          <p>${itemInCart[2]*itemInCart[7]}€</p>
          </div>
          <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
               <p>Qté : </p>
               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemInCart[7]}">
          </div>
          <div class="cart__item__content__settings__delete">
               <p class="deleteItem">Supprimer</p>
          </div>
          </div>
     </div>
     </article>`;
     }
}
displayCart(itemInCart);