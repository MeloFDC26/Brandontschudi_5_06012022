console.log("Produit");
const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");
console.log(idProduct);

let article;

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
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      console.log("Erreur de la requête API");
    });
}

// Fonction 'getPost' pour modifier infos canapé page "produit"
function getPost(article) {
  // On crée l'img
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  // On modifie le titre 'h1'
  let productName = document.getElementById("title");
  productName.innerText = article.name;

  // On modifie le prix
  let productPrice = document.getElementById("price");
  productPrice.innerText = article.price;

  // On modifie la description
  let productDescription = document.getElementById("description");
  productDescription.innerText = article.description;

  // Boucle pour les options de couleurs
  for (let color of article.colors) {
    console.table(color);
    let productColor = document.createElement("option");
    document.querySelector("#colors").appendChild(productColor);
    productColor.value = color;
    productColor.innerText = color;
  }

  addToCart(article);
  document.title = article.name;
}

//Gestion du panier
function addToCart(article) {
  const btnEnvoyerPanier = document.querySelector("#addToCart");

  //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
  btnEnvoyerPanier.addEventListener("click", (event) => {
    if (
      quantityPicked.value > 0 &&
      quantityPicked.value <= 100
    ) {
      //Recupération du choix de la couleur
      let choixCouleur = colorPicked.value;

      //Recupération du choix de la quantité
      let choixQuantite = quantityPicked.value;

      //Initialisation du local storage
      let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

      //fenêtre pop-up
      const popupConfirmation = () => {
        if (
          window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
          Pour consulter votre panier, cliquez sur OK`)
        ) {
          window.location.href = "cart.html";
        }
      };

      //Importation dans le local storage
      //Si le panier comporte déjà au moins 1 article
      if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
          (el) =>  el._id === idProduct && el.couleurProduit == choixCouleur);
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
          let newQuantite = parseInt(choixQuantite) + parseInt(resultFind.quantiteProduit);
          resultFind.quantiteProduit = newQuantite;
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
        //Si le produit commandé n'est pas dans le panier
        } else {
          produitLocalStorage.push({
            quantiteProduit: choixQuantite,
            couleurProduit: choixCouleur,
            ...article
          });
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
        }
      //Si le panier est vide
      } else {
        produitLocalStorage = [];
        produitLocalStorage.push({
          quantiteProduit: choixQuantite,
          couleurProduit: choixCouleur,
          ...article
        });
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
      }
    }
  });
}
