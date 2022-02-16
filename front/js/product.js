let idRecupere = ""; // variable globale 


// fonction pour appeller l'API
const fetchKanap =  async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${idRecupere}`);
        const data = await response.json();
        dataKanap = data;
        insertProductDetails(dataKanap);
    } catch (error) {
        console.log(`Message d'erreur ${error}` );
        alert('Une erreur est survenue lors du chargement de la page')
    }
}



// SearchParams => recupere l'ID
recupererId = () => {
    let settingURL = new URLSearchParams(window.location.search); //recuperer la 'queryString' de l'URL
    let param = settingURL.get("id"); // recuperer la valeur de 'id' dans l'URL
    idRecupere = param; // stockage de "param" dans la variable globale "idRecupere"
}
 
// création des fiches produits
insertProductDetails = (dataKanap) => {
    // déclaration variables + ajout éléments
    let price = document.getElementById('price');
    let description = document.getElementById('description');
    let colors = document.getElementById('colors');
    let img = document.querySelector(".item__img");
    let title = document.getElementById('title');
    
    // ajout img 
    let baliseImg = document.createElement("img"); // ajout balise img
    img.appendChild(baliseImg); // baliseImg est l'enfant d'img
    baliseImg.src = dataKanap.imageUrl; // ajout de la source de l'img
    baliseImg.alt = dataKanap.altTxt; // ajout alt 

    // ajout title 
    title.textContent = dataKanap.name;

    // ajout price 
    price.textContent = dataKanap.price;

    // ajout description 
    description.textContent = dataKanap.description; 

    // ajout colors
    // boucle pour casser array colors
    for(let availableColor of dataKanap.colors) { 
        let baliseColor = document.createElement("option"); // creation balise option
        colors.appendChild(baliseColor); // baliseColor enfant de colors
        baliseColor.textContent = availableColor; // ajout du texte 
    }
}

// appel des fonctions
recupererId();
fetchKanap();


// ***************************************
// AJOUT PANIER
// ***************************************


const addToCart = document.getElementById('addToCart');

// au click => récupération des informations
addToCart.addEventListener('click', () => {
        
    // recuperation de la couleur
    const colorChoice = document.getElementById('colors');
    if (!colorChoice.value) {
        alert('Veuillez sélectionner une couleur') // si pas de couleur selectionnée = message d'erreur
        return;
    }

    // recuperation de la quantite 
    const quantityChoice = document.getElementById('quantity')
    if (quantityChoice.value == 0 || quantityChoice.value > 100 ) {
        alert('Merci de sélectionner une quantité comprise entre 1 et 100'); // si la quantité est égale à 0 ou si elle dépasse 100 = message d'erreur
        return;
    }

    // recuperation de toutes les caracteristiques de l'article 
    const itemInCart = {
        id: dataKanap._id,
        nom: dataKanap.name,
        couleur: colorChoice.value,
        quantite: parseInt(quantityChoice.value),
        prix: dataKanap.price,
        description: dataKanap.description,
        image: dataKanap.imageUrl,
        texte: dataKanap.altText
        }; // création d'un objet qui contient toutes les infos

    console.log(itemInCart);

    // ajout des informations liés à l'article dans le LOCAL STORAGE
    let itemLocalStorage = JSON.parse(localStorage.getItem('product')) || [] ;
    console.log(itemLocalStorage);  

    const findItem = itemLocalStorage.find(
        (kanap) => 
            kanap.id == itemInCart.id && kanap.couleur == itemInCart.couleur);

    if (findItem) {
        findItem.quantite += itemInCart.quantite; 
        itemLocalStorage = itemLocalStorage.map((item) => {
            if (itemInCart.id == item.id && itemInCart.couleur == item.couleur) {
                return findItem;
            } 
            return item; 
        });
        console.log(itemLocalStorage);
    } else {
        itemLocalStorage.push(itemInCart);
    }
    localStorage.setItem('product', JSON.stringify(itemLocalStorage)) 
});
