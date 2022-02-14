let localStorageRecuperation = JSON.parse(localStorage.getItem('product'));
console.log(localStorageRecuperation); // verifie que le LS est bien présent dans la page panier 

console.log(typeof localStorageRecuperation); // string => objet


            // *******************
            // tableau qui récapitule ce qui est dans le panier
            // *******************

showProductInCart = (localStorageRecuperation) => {
    for(let productInCart of localStorageRecuperation){
        console.log(productInCart);
        // selection de l'element html
        let cart = document.getElementById('cart__items');

        // add des balises 
        let baliseArticle = document.createElement('article'); 

        let baliseDivImg = document.createElement('div');
        let baliseImg = document.createElement('img');

        let baliseDivContent = document.createElement('div');
        let baliseDivDescription = document.createElement('div');
        let baliseH2 = document.createElement('h2');
        let balisePColor = document.createElement('p');
        let balisePPrice = document.createElement('p');

        let baliseDivSettings = document.createElement('div');
        let baliseDivQuantity = document.createElement('div');
        let balisePQuantity = document.createElement('p');
        let baliseInputQuantity = document.createElement('input');

        let baliseDivDelete = document.createElement('div');
        let balisePDelete = document.createElement('p');

        // add des balises et des classes
            // article
        cart.appendChild(baliseArticle);
        baliseArticle.classList.add('cart__item');
        baliseArticle.dataset.id      = productInCart.id;
        baliseArticle.dataset.couleur = productInCart.couleur;

            // img
        baliseArticle.appendChild(baliseDivImg);
        baliseDivImg.classList.add('cart__item__img');  
        
        baliseDivImg.appendChild(baliseImg);
        baliseImg.src = productInCart.image;
        baliseImg.alt = productInCart.texte;

            // content
        baliseArticle.appendChild(baliseDivContent);
        baliseDivContent.classList.add('cart__item__content');

        baliseDivContent.appendChild(baliseDivDescription);
        baliseDivDescription.classList.add('cart__item__content__description');

        baliseDivDescription.appendChild(baliseH2);
        baliseH2.textContent = productInCart.nom;

        baliseDivDescription.appendChild(balisePColor);
        balisePColor.textContent = productInCart.couleur;

        baliseDivDescription.appendChild(balisePPrice);
        balisePPrice.textContent = `${productInCart.prix} €`;

            // settings
        baliseArticle.appendChild(baliseDivSettings);
        baliseDivSettings.classList.add('cart__item__content__settings');  

        baliseDivSettings.appendChild(baliseDivQuantity);
        baliseDivQuantity.classList.add('cart__item__content__settings__quantity');

        baliseDivQuantity.appendChild(balisePQuantity);
        balisePQuantity.textContent = `Qté: ${productInCart.quantite}`;

        baliseDivQuantity.appendChild(baliseInputQuantity);
        baliseInputQuantity.type    = 'number';
        baliseInputQuantity.classList.add('itemQuantity');
        baliseInputQuantity.name    = "itemQuantity";
        baliseInputQuantity.min     = '1';
        baliseInputQuantity.max     = '100'
        baliseInputQuantity.value   = productInCart.quantite;

            // delete
        baliseArticle.appendChild(baliseDivDelete);
        baliseDivDelete.classList.add('cart__item__content__settings__delete');

        baliseDivDelete.appendChild(balisePDelete);
        balisePDelete.classList.add('deleteItem');
        balisePDelete.textContent = 'Supprimer';
    }
}


// appel de la fonction
showProductInCart(localStorageRecuperation);



            // *******************
            // retirer ou ajouter des elements =>>>> à revoir
            // *******************

modifQuantity = (localStorageRecuperation) => {
    let quantityInput = document.querySelectorAll('.itemQuantity');
    let articles      = document.querySelectorAll('article');
    console.log(quantityInput);
    
    for(let quantityItem of quantityInput) {
        quantityItem.addEventListener('change', (e) => {
            let newQuantity   = e.target.value;
            console.log(newQuantity);
            let idArticles    = quantityItem.dataset.id;
            console.log(idArticles);
            let idArticle     = '';
            let colorArticle  = '';

            console.log(articles);
            for(let article of articles){
            idArticle       = article.dataset.id; // data-id
            console.log(idArticle);
            colorArticle    = article.dataset.couleur; // data-color
            }

            // localStorage
            let findIndexToModif = localStorageRecuperation.findIndex(
                (kanapModif) => 
                    kanapModif.id === idArticles && kanapModif.couleur === colorArticle);
            localStorageRecuperation[findIndexToModif].quantite = newQuantity;
            console.log(newQuantity);
            localStorageRecuperation.push(newQuantity);
            localStorageRecuperation.pop();
            console.log(typeof localStorageRecuperation); // => objet
            localStorage.setItem('product', JSON.stringify(localStorageRecuperation));
        })
    }
}


// appel de la fonction
modifQuantity(localStorageRecuperation);



            // *******************
            // formulaire 
            // *******************

// variables Regex
let nameRegex   = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
let addressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
let emailRegex   = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

// récupère les ids
const firstName = document.getElementById('firstName');
const lastName  = document.getElementById('lastName');
const address   = document.getElementById('address');
const city      = document.getElementById('city');
const email     = document.getElementById('email');

// firstName
firstName.addEventListener('input', (e) => {
    e.preventDefault();
    if(nameRegex.test(firstName.value) == false || firstName.value == "") {
        document.getElementById('firstNameErrorMsg').textContent = "Le prénom saisi n'est pas valide";
        return false;
    } else {
        document.getElementById('firstNameErrorMsg').textContent = "";
        return true;
    }
});

// lastName 
lastName.addEventListener('input', (e) => {
    e.preventDefault();
    if(nameRegex.test(lastName.value) == false || lastName.value == ""){
        document.getElementById('lastNameErrorMsg').textContent = "Le nom saisi n'est pas valide";
        return false;
    } else {
        document.getElementById('lastNameErrorMsg').textContent = "";
        return true;
    }
}); 

// address
address.addEventListener('input', (e) => {
    e.preventDefault();
    if(addressRegex.test(address.value) == false || address.value == "") {
        document.getElementById('addressErrorMsg').textContent = "L'adresse saisie n'est pas valide";
        return false;
    } else {
        document.getElementById('addressErrorMsg').textContent = "";
        return true;
    }
});

// city
city.addEventListener('input', (e) => {
    e.preventDefault();
    if(nameRegex.test(city.value) == false || city.value == "") {
        document.getElementById('cityErrorMsg').textContent = "La ville saisie n'est pas valide";
        return false;
    } else {
        document.getElementById('cityErrorMsg').textContent = "";
        return true;
    }
});

// email
email.addEventListener('input', (e) => {
    e.preventDefault();
    if(emailRegex.test(email.value) == false || email.value == "") {
        document.getElementById('emailErrorMsg').textContent = "L'adresse mail saisie n'est pas valide";
        return false;
    } else {
        document.getElementById('emailErrorMsg').textContent = "";
        return true;
    }
});

// commander
const order = document.getElementById('order');

order.addEventListener('click', (e) => {
    e.preventDefault();
    // récupère les données du client
    let customerContact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email:email.value,
    };
    // conditions
    if(firstName.value === "" || 
       lastName.value === "" || 
       address.value === "" || 
       city.value === "" || 
       email.value === "") {
        alert("Renseigner vos coordonnées afin de passer la commande.")
    } else if(nameRegex.test(firstName.value) == false || 
              nameRegex.test(lastName.value) == false || 
              addressRegex.test(address.value) == false ||
              nameRegex.test(city.value) == false || 
              emailRegex.test(email.value) == false){
                  alert('Renseigner correctement vos coordonnées afin de passer la commande.')
              } else {
                  let products = [];
                  localStorageRecuperation.forEach((order) => {
                      products.push(order.id);
                  });
                  let pageOrder = {customerContact, products};
                  // envois des données à l'API
                  fetch('http://localhost:3000/api/products/order', {
                      method: "POST",
                      headers: {
                          Accept: {
                            Accept: "application/json",
                            "Content-type": "application/json",
                          }  
                      },
                      body: JSON.stringify(pageOrder),
                  })
                  .then((res) => {
                      return res.json();
                  })
                  .then((confirm) => {
                    window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
                    localStorage.clear();
                  })
                  .catch((error) => {
                      console.log(`erreur : ${error} `);
                  });
              }
});