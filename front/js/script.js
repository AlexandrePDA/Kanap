let dataKanap = [];

const fetchKanap = async() => {
    await fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((data) => {
        dataKanap = data;
        console.log(dataKanap);
    })
};

fetchKanap()


