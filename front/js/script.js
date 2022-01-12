let dataKanap = "";

// fonction pour appeller l'API
const fetchKanap = async () => {
    await fetch('http://localhost:3000/api/products/')
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        console.log(data);
        dataKanap = data;
        insertProduct(dataKanap);
    })
    .catch((error) => {
        console.log("Message d'erreur" + error);
        alert("Une erreur est survenue lors du chargement de la page")
    })
}


const insertProduct = (dataKanap) => {
    for(let kanapItem of dataKanap){ // casser le tableau
        // selectionner l'id Items sur l'HTML
        const items = document.querySelector("#items");
        
        // création des balises a, article, img, h3 et p
        const card = document.createElement("a");
        const article = document.createElement("article");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const p= document.createElement("p"); 
        
        // faire en sorte que les balises s'imbriquent l'une dans l'autre
        items.appendChild(card);
        card.href = `./product.html?id=${kanapItem._id}`;
        
        card.appendChild(article);
        article.appendChild(img);
        img.src = kanapItem.imageUrl;
        img.alt = kanapItem.altTxt;
        
        article.appendChild(h3);
        h3.textContent = kanapItem.name;
        h3.classList.add("productName");
        
        article.appendChild(p);
        p.textContent = kanapItem.description;
        p.classList.add("productDescription");
    }
    console.log(items);
}

// appel de la fonction
fetchKanap();