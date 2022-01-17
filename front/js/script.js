console.log("Acceuil");
getProducts().then(function (products) {
  displayProducts(products);
});

//Je dois interroger le serveur pour récupérer la liste des produits
function getProducts() {
  return fetch("http://localhost:3000/api/products")
    .then(function (response) {
      return response.json();
    })
    .then(function (products) {
      return products;
    });
}

//Je dois afficher la liste des produits reçus
function displayProducts(products) {
  console.table(products);
  for (let product in products) {
    const itemsSection = document.getElementById("items");

    //Création "élément <a>"
    let productLink = document.createElement("a");
    itemsSection.appendChild(productLink);
    productLink.href = `product.html?id=${products[product]._id}`;

    //Création "élément <article>"
    let productArticle = document.createElement("article");
    productLink.appendChild(productArticle);

    // Insertion de l'image
    let productImg = document.createElement("img");
    productArticle.appendChild(productImg);
    productImg.src = products[product].imageUrl;
    productImg.alt = products[product].altTxt;

    // Insertion du titre "h3"
    let productName = document.createElement("h3");
    productArticle.appendChild(productName);
    productName.classList.add("productName");
    productName.innerHTML = products[product].name;

    // Insertion de la description "p"
    let productDescription = document.createElement("p");
    productArticle.appendChild(productDescription);
    productDescription.classList.add("productName");
    productDescription.innerHTML = products[product].description;
  }
}
