// *******************
// initialisation
// *******************

// remplacer 'product' par CART_KEY
const CART_KEY = 'product';

let kanaps = null;

// Appel API
const fetchKanaps = async () => {
    if (kanaps) {
        return kanaps;
    }
    try {
        const response = await fetch('http://localhost:3000/api/products/');
        kanaps = await response.json();
        return kanaps;
    } catch (error) {
        console.log(`Message d'erreur : ${error}`);
        alert(`Une erreur est survenue lors du chargement de la page`)
    }
}

// return kanap dans le localStorage avec toutes les infos
const getKanapLocalStorage = async () => {
    const listKanap = await fetchKanaps();
    const localStorageRecuperation = JSON.parse(localStorage.getItem(CART_KEY) || [] );
    return localStorageRecuperation.map((item) => {
        const find = listKanap.find((kanap) => kanap._id == item.id);
        return {
            ... item,
            ... find,
        };
    });
}

// *******************
// tableau qui récapitule ce qui est dans le panier 
// en l'affichant dans la baliseArticle
// + gére les quantités et le prix
// *******************

const showProductInCart = async () => {
    const cart = document.getElementById('cart__items');
    const localStorageRecuperation = await getKanapLocalStorage();
    cart.innerHTML  = null;
    let sumQuantity = 0;
    let sumPrice    = 0;
    for(const product of localStorageRecuperation) {
        const baliseArticle = createProduct(product);
        cart.appendChild(baliseArticle);
        sumQuantity += Number(product.quantite);
        sumPrice    += product.price * product.quantite; 
    }
    const totalQuantity     = document.getElementById('totalQuantity');
    const totalPrice        = document.getElementById('totalPrice');
    totalQuantity.innerText = sumQuantity;
    totalPrice.innerText    = sumPrice;
};



// *******************
// ajout des éléments sur le DOM 
// + ajouter/retirer des élements 
// *******************

const createProduct = (product) => {
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
    baliseArticle.classList.add('cart__item');
    baliseArticle.dataset.id      = product._id;
    baliseArticle.dataset.couleur = product.color;

    // img
    baliseArticle.appendChild(baliseDivImg);
    baliseDivImg.classList.add('cart__item__img');  
        
    baliseDivImg.appendChild(baliseImg);
    baliseImg.src = product.imageUrl;
    baliseImg.alt = product.altTxt;

    // content
    baliseArticle.appendChild(baliseDivContent);
    baliseDivContent.classList.add('cart__item__content');

    baliseDivContent.appendChild(baliseDivDescription);
    baliseDivDescription.classList.add('cart__item__content__description');

    baliseDivDescription.appendChild(baliseH2);
    baliseH2.textContent = product.name;

    baliseDivDescription.appendChild(balisePColor);
    balisePColor.textContent = product.color;

    baliseDivDescription.appendChild(balisePPrice);
    balisePPrice.textContent = `${product.price} €`;

    // settings
    baliseArticle.appendChild(baliseDivSettings);
    baliseDivSettings.classList.add('cart__item__content__settings');  

    baliseDivSettings.appendChild(baliseDivQuantity);
    baliseDivQuantity.classList.add('cart__item__content__settings__quantity');

    baliseDivQuantity.appendChild(balisePQuantity);
    balisePQuantity.textContent = `Qté: ${product.quantite}`;

    baliseDivQuantity.appendChild(baliseInputQuantity);
    baliseInputQuantity.type    = 'number';
    baliseInputQuantity.classList.add('itemQuantity');
    baliseInputQuantity.name    = "itemQuantity";
    baliseInputQuantity.min     = '1';
    baliseInputQuantity.max     = '100'
    baliseInputQuantity.value   = product.quantite;

    // ajouter des elements 
    baliseInputQuantity.addEventListener('change', async (e) => {
        const value = e.target.value;
        const localStorageRecuperation = await getKanapLocalStorage();
        const newArray = localStorageRecuperation.map((item) => {
            if(item.id == product.id && item.couleur == product.couleur) {
                return {
                    id:item.id,
                    couleur: item.couleur,
                    quantite: value,
                };
            }
            return {
                id:item.id,
                couleur: item.couleur,
                quantite: item.quantite,
            };
        });
        localStorage.setItem(CART_KEY, JSON.stringify(newArray));
        showProductInCart();
    });

    // delete
    baliseArticle.appendChild(baliseDivDelete);
    baliseDivDelete.classList.add('cart__item__content__settings__delete');

    baliseDivDelete.appendChild(balisePDelete);
    balisePDelete.classList.add('deleteItem');
    balisePDelete.textContent = 'Supprimer';

    // retirer des éléments 
    balisePDelete.addEventListener('click', async () => {
        const localStorageRecuperation = await getKanapLocalStorage();
        const newArray = localStorageRecuperation.filter(
            (item) => !(item.id ==product.id && item.couleur == product.couleur)
        ).map(item => ({id: item.id, quantite: item.quantite, couleur: item.couleur }));
        
        localStorage.setItem(CART_KEY, JSON.stringify(newArray));
        showProductInCart();
    });
    return baliseArticle;
}


// appel de la fonction
showProductInCart();



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


// *******************
//  commander
// *******************

const order = document.getElementById('order');

// au click => les données du LS sont sauvegardées et envoyées à l'API
order.addEventListener('click', async (e) => {
    e.preventDefault();
    const localStorageRecuperation = await getKanapLocalStorage();
    // récupère les données du client
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email:email.value,
    };
    // conditions
    const isEmpty = 
        firstName.value === "" || 
        lastName.value === "" || 
        address.value === "" || 
        city.value === "" || 
        email.value === "";
    
    const isTextRegex = 
        nameRegex.test(firstName.value) == false || 
        nameRegex.test(lastName.value) == false || 
        addressRegex.test(address.value) == false ||
        nameRegex.test(city.value) == false || 
        emailRegex.test(email.value) == false;
    if(isEmpty | isTextRegex) {
        alert("Renseigner vos coordonnées afin de passer la commande.")
        return;
    } else {
        const products = localStorageRecuperation.map((order) => order.id);
        let pageOrder = {contact, products};
        // envois des données à l'API
        try {
            const res = await fetch('http://localhost:3000/api/products/order', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(pageOrder),
            });
            const confirm = await res.json();
            window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
            localStorage.clear();
        } catch (error) {
            console.log(`erreur : ${error}`);
        }
    }
});        
        
