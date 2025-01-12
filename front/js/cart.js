console.log("Cart");

// Initialisation du local storage et récupération de son contenu
let produitLocalStorage = JSON.parse(localStorage.getItem("produit") || "[]");

// Si le panier est vide
function getCart() {
  if (produitLocalStorage.length === 0) {
    const emptyCart = `Le panier est vide`;
    const positionEmptyCart = document.getElementById("cart__items");
    positionEmptyCart.innerText = emptyCart;
  }
  // Si au moins un article est dans le panier
  else {
    getProducts().then(function (products) {
      // Boucle pour créer les éléments
      for (let produit of produitLocalStorage) {
        const foundProduct = products.find(function(product) {
          return product._id == produit._id
        })
        if(foundProduct) {
          produit.price = foundProduct.price;
        }else {
          console.error('Produit non trouvé !');
          break
        }
        // Création de l'article "cart__item"
        let productCartArticle = document.createElement("article");
        document.getElementById("cart__items").appendChild(productCartArticle);
        productCartArticle.className = "cart__item";
        productCartArticle.setAttribute("data-id", produit.idProduit);
        productCartArticle.setAttribute("data-color", produit.colors);

        // Création de la div img "cart__item__img"
        let productCartImgDiv = document.createElement("div");
        productCartArticle.appendChild(productCartImgDiv);
        productCartImgDiv.className = "cart__item__img";

        // Création de l'img dans sa div
        let productCartImg = document.createElement("img");
        productCartImgDiv.appendChild(productCartImg);
        productCartImg.src = produit.imageUrl;
        productCartImg.alt = produit.altTxt;

        // Création de la div "cart__item__content"
        let productCartContent = document.createElement("div");
        productCartContent.className = "cart__item__content";
        productCartArticle.appendChild(productCartContent);

        // Création du titre h2 dans "cart__item__content__description"
        let productCartTitle = document.createElement("h2");
        productCartContent.appendChild(productCartTitle);
        productCartTitle.innerText = produit.name;

        // Création de p (couleur) dans "cart__item__content__description"
        let productCartColor = document.createElement("p");
        productCartContent.appendChild(productCartColor);
        productCartColor.innerText = produit.couleurProduit;

        // Création de p (prix) dans "cart__item__content__description"
        let productCartPrice = document.createElement("p");
        productCartContent.appendChild(productCartPrice);
        productCartPrice.innerText = `${produit.price}` + "€";

        // Création de la div "cart__item__content__settings"
        let productCartSettings = document.createElement("div");
        productCartSettings.className = "cart__item__content__settings";
        productCartArticle.appendChild(productCartSettings);

        // Création de la div "cart__item__content__settings__quantity"
        let productCartSettingsQuantity = document.createElement("div");
        productCartSettingsQuantity.className =
          "cart__item__content__settings__quantity";
        productCartSettings.appendChild(productCartSettingsQuantity);

        // Création de p (quantité) dans "cart__item__content__settings__quantity"
        let productCartQuantity = document.createElement("p");
        productCartSettingsQuantity.appendChild(productCartQuantity);
        productCartQuantity.innerText = "Qté : ";

        // Création de l'input (choix quantité) dans "cart__item__content__settings__quantity"
        let productCartInputQte = document.createElement("input");
        productCartSettingsQuantity.appendChild(productCartInputQte);
        productCartInputQte.className = "itemQuantity";
        productCartInputQte.setAttribute("type", "number");
        productCartInputQte.setAttribute("name", "itemQuantity");
        productCartInputQte.setAttribute("min", "1");
        productCartInputQte.setAttribute("max", "100");
        productCartInputQte.setAttribute("value", `${produit.quantiteProduit}`);

        // Création de la div "cart__item__content__settings__delete"
        let productCartDivDelete = document.createElement("div");
        productCartSettings.appendChild(productCartDivDelete);
        productCartDivDelete.className =
          "cart__item__content__settings__delete";

        // Création de p dans la div "cart__item__content__settings__delete"
        let productCartDelete = document.createElement("p");
        productCartDivDelete.appendChild(productCartDelete);
        productCartDelete.className = "deleteItem";
        productCartDelete.innerText = "Supprimer";
      }
      modifQuantity();
      productCartDelete();
      getTotals();
    });
  }
}
getCart();

// Récupération des valeurs totales (quantité et prix)
function getTotals() {
  // Total quantité (i est une variable locale)
  let articleQte = document.getElementsByClassName("itemQuantity"); //On récupère l'input
  let articleQteLength = articleQte.length; //Nombre d'articles dans le [local storage]
  quantityTotal = 0; //On initialise 'quantityTotal' sur 0 pour l'addition
  for (let i = 0; i < articleQteLength; ++i) {
    //Boucle pour additionner le nombre d'articles dans [local storage]
    quantityTotal += articleQte[i].valueAsNumber; //Quantité totale (=0) + nombre d'articles = Quantité totale
  }
  let productCartTotalQuantity = document.getElementById("totalQuantity"); //On récupère l'élément '#totalQuantity' dans le HTML
  productCartTotalQuantity.innerText = quantityTotal; //Et on modifie le texte dans #totalQuantity par le résultat de l'addition

  // Prix total du panier
  totalPrice = 0; //On initialise 'totalPrice' sur 0 pour les additions
  for (let i = 0; i < articleQteLength; ++i) {
    //Boucle pour additionner les prix en faisant la multiplication pour les articles identiques (même id + même couleur)
    totalPrice += articleQte[i].valueAsNumber * produitLocalStorage[i].price; //Prix total (=0) + (nombre d'articles * le prix de l'article) = Prix total
  }
  let productCartTotalPrice = document.getElementById("totalPrice"); //On récupère l'id #totalPrice
  productCartTotalPrice.innerText = totalPrice; //Et on modifie le contenu de #totalPrice par le résultat de l'addition
  console.log(totalPrice);
}


// Modification de la quantité d'un article dans le panier (r est une variable locale)
function modifQuantity() {
  let inputQuantity = document.getElementsByClassName("itemQuantity"); //On récupère la classe .itemQuantity
  console.log(inputQuantity);

  // Boucle pour changer la quantité et modifier le prix
  for (let r = 0; r < produitLocalStorage.length; r++) {
    //(r++ = rendu avant incrémentation, ++r rend après incrémentation)
    inputQuantity[r].addEventListener("change", (event) => {
      //On écoute le changement de valeur dans l'input
      event.preventDefault();
      produitLocalStorage[r].quantiteProduit = event.target.value; // On modifie la quantité initiale par la valeur modifiée
     
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage)); //On met à jour le [local storage]

      // refresh rapide pour afficher instantanément le résultat (quantité et prix totaux)
      location.reload();
    });
  }
}
 //Grâce à la fonction getTotals() et le refresh rapide, le calcul du prix total est actualisé directement

// Suppression d'un produit du panier (d est une variable locale)
function productCartDelete() {
  let btnSupprimerPanier = document.getElementsByClassName("deleteItem"); //On récupère .deleteItem qui représente le bouton 'supprimer'

  //Boucle pour supprimer l'article au 'click' sur le bouton 'supprimer'
  for (let d = 0; d < btnSupprimerPanier.length; d++) {
    btnSupprimerPanier[d].addEventListener("click", (event) => {
      event.preventDefault();

      //On sélectionne les éléments à supprimer dans [local storage] par rapport à l'id et la couleur du produit à supprimer
      let supprId = produitLocalStorage[d]._id; //L'id du produit dans [local storage]
      let supprColor = produitLocalStorage[d].couleurProduit; //La couleur du produit dans [local storage]
      produitLocalStorage = produitLocalStorage.filter(
        (el) => el._id !== supprId || el.couleurProduit !== supprColor
      ); //On filtre les id et les couleurs à supprimer (ici on dit :"filtrer 'supprId' et 'supprColor' au click sur le bouton 'supprimer'")

      localStorage.setItem("produit", JSON.stringify(produitLocalStorage)); //On met à jour le [local storage]

      //Alerte produit supprimé et refresh rapide
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  }
}


//Validation du formulaire avec RegExp
let form = document.querySelector(".cart__order__form");
form.addEventListener("submit", onSubmit);
function onSubmit(event) {
  event.preventDefault();
  const formValidation = {
    first: true,
    last: true,
    email: true,
    adress: true,
    city: true,
  };

  //firstName et LastName on veut 2 caractères min sans caractères spéciaux ni chiffres
  const firstLastNamesRegex =
    /^[a-zA-Z-éëàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇÆæœ]{2,}$/;
  const firstNameValue = document.getElementById("firstName");
  let firstNameErrorMsg = firstNameValue.nextElementSibling;

  if (firstLastNamesRegex.test(firstNameValue.value)) {
    firstNameErrorMsg.innerText = "";
    formValidation.first = true;
  } else {
    firstNameErrorMsg.innerText =
      "Veuillez renseigner 2 caractères au moins, sans chiffres.";
    formValidation.first = false;
  }
  const lastNameValue = document.getElementById("lastName");
  let lastNameErrorMsg = lastNameValue.nextElementSibling;

  if (firstLastNamesRegex.test(lastNameValue.value)) {
    lastNameErrorMsg.innerText = "";
    formValidation.last = true;
  } else {
    lastNameErrorMsg.innerText =
      "Veuillez renseigner 2 caractères au moins, sans chiffres.";
    formValidation.last = false;
  }

  //Adresse et Ville = que ce ne soit pas vide
  let addressRegex = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );
  const addressValue = document.getElementById("address");
  let addressErrorMsg = addressValue.nextElementSibling;

  if (addressRegex.test(addressValue.value)) {
    addressErrorMsg.innerText = "";
    formValidation.adress = true;
  } else {
    addressErrorMsg.innerText =
      "Veuillez renseigner une adresse valide. ex: 2 rue Pierre Julien";
    formValidation.adress = false;
  }
  const cityNameValue = document.getElementById("city");
  let cityNameResultErrorMsg = cityNameValue.nextElementSibling;

  if (firstLastNamesRegex.test(cityNameValue.value)) {
    cityNameResultErrorMsg.innerText = "";
    formValidation.city = true;
  } else {
    cityNameResultErrorMsg.innerText =
      "Veuillez renseigner 2 caractères au moins, sans chiffres.";
    formValidation.city = false;
  }

  //Adresse mail = qu'elle soit valide
  const emailValue = document.getElementById("email");
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let emailResultErrorMsg = emailValue.nextElementSibling;

  if (emailRegExp.test(emailValue.value)) {
    emailResultErrorMsg.innerText = "";
    formValidation.email = true;
  } else {
    emailResultErrorMsg.innerText =
      "Veuillez renseigner une adresse mail valide. ex: abc@def.com";
    formValidation.email = false;
  }
  if (
    formValidation.first &&
    formValidation.last &&
    formValidation.adress &&
    formValidation.city &&
    formValidation.email
  ) {
    getPost();
  }
}

// Envoi des informations saisies dans le formulaire après vérification RegExp
function getPost() {
  const btnCommanderPanier = document.getElementById("order"); //On récupère l'id #order
  btnCommanderPanier.addEventListener("click", (event) => {
    // On écoute le "click" sur le bouton 'commander'

    //Récupération des coordonnées du formulaire client
    let firstNameValue = document.getElementById("firstName");
    let lastNameValue = document.getElementById("lastName");
    let addressValue = document.getElementById("address");
    let cityNameValue = document.getElementById("city");
    let emailValue = document.getElementById("email");

    let idProducts = []; // On Crée un tableau (array) appelé 'idProducts' dans [local storage]
    for (let p = 0; p < produitLocalStorage.length; p++) {
      //Boucle pour pousser les informations dans [local storage]
      idProducts.push(produitLocalStorage[p]._id); //On pousse les infos "idProducts" sur [local storage]
    }

    const order = {
      contact: {
        firstName: firstNameValue.value,
        lastName: lastNameValue.value,
        address: addressValue.value,
        city: cityNameValue.value,
        email: emailValue.value,
      },
      products: idProducts,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        document.location.href = `confirmation.html?id=${data.orderId}`;
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  });
}

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
