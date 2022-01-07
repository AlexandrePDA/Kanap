let dataKanap = "";
// décalaration variable globale


// Fonction pour requeter l'API sur l'ens. des produits
const fetchKanap = () => {
    fetch('http://localhost:3000/api/products/')
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            console.log(`Erreur : ${response.status}`); // Affiche sur la console l'erreur
            alert("Une erreur est survenue lors du chargement de la page");
        }
    })
    .then((data) => {
        dataKanap = data;   //stockage dans dataKanap
        console.log(dataKanap[1].name); 
        // for(let kanapItem in dataKanap){
        //     console.log(kanapItem);
        // }   
    })
}

// Appel de l'API
fetchKanap();



