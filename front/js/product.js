console.log('Produit');
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);

let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Je récupère la liste des produits de l'API + id du produit
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}

// Fonction 'getPost' pour modifier infos canapé page "produit"
function getPost(article){
    // On crée l'img
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // On modifie le titre 'h1'
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // On modifie le prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // On modifie la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Boucle pour les options de couleurs
    for (let colors of article.colors) {
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }

    addToCart(article);
    document.title = article.name;
}