console.log("Acceuil");
getProducts()
    .then(function (products) {
        displayProducts(products);  
    }
);

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

//Je dois afficher la liste des produits reçue
function displayProducts(products) {
  console.log(products);
  for (let product of products) {
    const itemsSection = document.getElementById("items");
    itemsSection.innerText += product.name;
  }
}
