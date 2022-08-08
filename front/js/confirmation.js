// Récupération de l'orderId à afficher via l'URL de la page
let orderId = (new URL(document.location)).searchParams.get("orderId");
console.table(orderId);

// Insertion dans le DOM
document.getElementById("orderId").innerHTML = orderId;