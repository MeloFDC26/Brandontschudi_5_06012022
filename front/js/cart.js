console.log("Cart");

// Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit") || "[]");
console.table(produitLocalStorage);

// Si le panier est vide
function getCart(){
    if (produitLocalStorage === 0){
        const emptyCart = `<p>Le panier est vide</p>`;
        const positionEmptyCart = document.getElementById("cart__items");
        positionEmptyCart.innerHTML = emptyCart;
    }
// Si au moins un article est dans le panier
    else{
        // Boucle pour créer les éléments
        for (let produit of produitLocalStorage){

            // Création de l'article "cart__item"
            let productCartArticle = document.createElement("article");
            document.getElementById("cart__items").appendChild(productCartArticle);
            productCartArticle.className = "cart__item";
            productCartArticle.setAttribute('data-id', produit.idProduit);
            productCartArticle.setAttribute('data-color', produit.colors);

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
            productCartColor.innerText = produit.color;

            // Création de p (prix) dans "cart__item__content__description"
            let productCartPrice = document.createElement("p");
            productCartContent.appendChild(productCartPrice);
            productCartPrice.innerText = produit.price + "€";

            // Création de la div "cart__item__content__settings"
            let productCartSettings = document.createElement("div");
            productCartSettings.className = "cart__item__content__settings";
            productCartArticle.appendChild(productCartSettings);

            // Création de la div "cart__item__content__settings__quantity"
            let productCartSettingsQuantity = document.createElement("div");
            productCartSettingsQuantity.className = "cart__item__content__settings__quantity";
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
            productCartInputQte.setAttribute("value", "42");

            // Création de la div "cart__item__content__settings__delete"
            let productCartDivDelete = document.createElement("div");
            productCartSettings.appendChild(productCartDivDelete);
            productCartDivDelete.className = "cart__item__content__settings__delete";

            // Création de p dans la div "cart__item__content__settings__delete"
            let productCartDelete = document.createElement("p");
            productCartDivDelete.appendChild(productCartDelete);
            productCartDelete.className = "deleteItem";
            productCartDelete.innerText = "Supprimer";
        }
    }
}
getCart();