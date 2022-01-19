let idRecupere = ""; // variable globale 


// fonction pour appeller l'API
const fetchKanap = async () => {
    await fetch(`http://localhost:3000/api/products/${idRecupere}`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        console.log(data);
        dataKanap = data;
        insertProductDetails(dataKanap);
    })
    .catch((error) => {
        console.log("Message d'erreur" + error);
        alert("Une erreur est survenue lors du chargement de la page")
    })
}



recupererId = () => {
    let settingURL = new URLSearchParams(window.location.search); //recuperer la 'queryString' de l'URL
    let param = settingURL.get("id"); // recuperer la valeur de 'id' dans l'URL
    idRecupere = param; // stockage de "monParametre" dans la variable globale "idRecupere"
    console.log(`Le paramètre récupéré dans l'URL est ${param}`); // Affichage du paramètre récupéré dans la console
    console.log(idRecupere);
}
  
insertProductDetails = (dataKanap) => {
    // déclaration variables + ajout éléments
    let price = document.getElementById('price');
    let description = document.getElementById('description');
    let colors = document.getElementById('colors');
    // let option = document.createElement('option');
    // let quantity = document.getElementById('quantity');
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
