// *******************
// confirmation
// *******************

// récupère l'orderId
const params = new URL(document.location).searchParams;
const orderId = params.get("orderId");

// Affiche le numéro de commande sur le DOM
document.getElementById("orderId").textContent = orderId;


