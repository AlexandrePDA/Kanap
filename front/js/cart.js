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
            // let idArticle     = '';
            // let colorArticle  = '';

            console.log(articles);
            // for(let article of articles){
            // idArticle       = article.dataset.id; // data-id
            // console.log(idArticle);
            // colorArticle    = article.dataset.couleur; // data-color
            // }

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

form = () => {
    let form = document.querySelector(".cart__order__form"); 
    console.log(form);
    // prénom
    form.firstName.addEventListener("change", () => {
      firstNameValidate(this);
    });
    // nom
    form.lastName.addEventListener("change", () => {
      nameValidate(this); 
    });
    // adresse
    form.address.addEventListener("change", () => {
      adressValidate(this); 
    });
    // ville
    form.city.addEventListener("change", () => {
      cityValidate(this); 
    });
    // email
    form.email.addEventListener("change", () => {
      emailValidate(this); 
    });
  }

  
  // prenom
  firstNameValidate = (firstNameSubmit) => {
      // mise en place du RegExp
      let firstNameRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$", "g");
      
      // test du RegExp
      let firstNameTest = firstNameRegExp.test(firstNameSubmit.value); // prends en compte la saisie du client
      console.log(firstNameTest);
      
      if(firstNameRegExp){
          console.log('saisie correct');
          let messageError = document.getElementById('firstNameErrorMsg');
          messageError.textContent = '';
        } else {
            console.log('erreur');
            let messageError = document.getElementById('firstNameErrorMsg');
            messageError.textContent = 'Le prénom ne doit contenir ni des chiffres ni des caractères spéciaux !';
        }
    }

// appel de la fonction
form();