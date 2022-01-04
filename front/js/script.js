let dataKanap = [];

// fetch API Kanap, dataKanap posséde les données de l'API
// kanapItem correspond maintenant à chaque canapé
const fetchKanap = async() => {
    await fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((data) => {
        dataKanap = data
    })
    
    for(const kanapItem of dataKanap){
            console.log(kanapItem);
        }
    };


fetchKanap()

