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




recupererId = () => {
    let settingURL = new URLSearchParams(window.location.search); //recuperer la 'queryString' de l'URL
    let param = settingURL.get("id"); // recuperer la valeur de 'id' dans l'URL
    idRecupere = param; // stockage de "param" dans la variable globale "idRecupere"
}
  
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


addCart = () => {
    let addToCart = document.getElementById('addToCart');
    addToCart.addEventListener('click', function () {
        
        // recuperation de la couleur
        let colorChoice = document.getElementById('colors')
        if (!colorChoice.value) {
            alert('Veuillez sélectionner une couleur') // si pas de couleur selectionnée = message d'erreur
            return;
        }

        // recuperation de la quantite 
        let quantityChoice = document.getElementById('quantity')
        if (quantityChoice.value == 0 || quantityChoice.value > 100 ) {
            alert('Merci de sélectionner une quantité comprise entre 1 et 100'); // si la quantité est égale à 0 ou si elle dépasse 100 = message d'erreur
            return;
        }

        // recuperation de toutes les caracteristiques de l'article 
        let itemInCart = {
            id: dataKanap._id,
            nom: dataKanap.name,
            couleur: colorChoice.value,
            quantite: quantityChoice.value,
            prix: dataKanap.price,
            description: dataKanap.description,
            image: dataKanap.imageUrl,
            texte: dataKanap.altText
        }; // création d'un objet qui contient toutes les infos

        console.log(itemInCart);

        // ajout des informations liés à l'article dans le LOCAL STORAGE
        let itemLocalStorage = localStorage.getItem('product');
        console.log(typeof itemLocalStorage);  
        if (itemLocalStorage == null) {
            console.log(`Le panier ne contient aucun canapé`);
            itemLocalStorage = []; // tableau vide qui sera complété par la suite
            itemLocalStorage.push(itemInCart); // ajout item dans le tableau
            localStorage.setItem("product", JSON.stringify(itemLocalStorage)); // save l'article dans le LocalStorage // stringify permet de transformer l'objet en chaine de caractere 
        } else {
            console.log(`le panier a un ou des canapés`);
            itemLocalStorage = JSON.parse(itemLocalStorage); // string => objet
            
            
            let findIndex = itemLocalStorage.findIndex((kanap) => kanap.id === itemInCart.id && kanap.couleur === itemInCart.couleur);
            console.log(findIndex);
            if (findIndex !== -1) {
                itemLocalStorage[findIndex].quantite = parseInt(itemLocalStorage[findIndex].quantite) + parseInt(quantityChoice.value);
                itemLocalStorage.push(itemInCart);
                itemLocalStorage.pop();
                console.log(itemLocalStorage);
                console.log(typeof itemLocalStorage);
                itemLocalStorage.setItem("product", JSON.stringify(itemLocalStorage));
            } else {
                itemLocalStorage.push(itemInCart);
                console.log(itemLocalStorage);
                console.log(typeof itemLocalStorage);
                localStorage.setItem("product", JSON.stringify(itemLocalStorage));
            }
        }
        console.log(itemLocalStorage);
    });
} 


addCart();

// *********************
// revoir de la ligne 100 à 130