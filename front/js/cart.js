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
        console.log(emptyCart);
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
            productCartColor.innerText = produit.couleurProduit;

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
            productCartInputQte.setAttribute("value", produit.quantiteProduit);

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

// Récupération des valeurs totales (quantité et prix)
function getTotals(){

    // Total quantité (i est une variable locale)
    let articleQte = document.getElementsByClassName("itemQuantity");  //On récupère l'input
    let articleQteLength = articleQte.length; //Nombre d'articles dans le [local storage]
    quantityTotal = 0; //On initialise 'quantityTotal' sur 0 pour l'addition
    for (let i = 0; i < articleQteLength; ++i) { //Boucle pour additionner le nombre d'articles dans [local storage]
        quantityTotal += articleQte[i].valueAsNumber; //Quantité totale (=0) + nombre d'articles = Quantité totale
    }
    let productCartTotalQuantity = document.getElementById('totalQuantity'); //On récupère l'élément '#totalQuantity' dans le HTML
    productCartTotalQuantity.innerText = quantityTotal; //Et on modifie le texte dans #totalQuantity par le résultat de l'addition
    console.log(quantityTotal);

    // Prix total du panier
    totalPrice = 0; //On initialise 'totalPrice' sur 0 pour les additions
    for (let i = 0; i < articleQteLength; ++i) { //Boucle pour additionner les prix en faisant la multiplication pour les articles identiques (même id + même couleur)
        totalPrice += (articleQte[i].valueAsNumber * produitLocalStorage[i].price); //Prix total (=0) + (nombre d'articles * le prix de l'article) = Prix total
    }
    let productCartTotalPrice = document.getElementById('totalPrice'); //On récupère l'id #totalPrice
    productCartTotalPrice.innerText = totalPrice; //Et on modifie le contenu de #totalPrice par le résultat de l'addition
    console.log(totalPrice);
}
getTotals();

// Modification de la quantité d'un article dans le panier (r est une variable locale)
function modifQuantity(){
    let inputQuantity = document.querySelectorAll(".itemQuantity"); //On récupère la classe .itemQuantity 

    // Boucle pour changer la quantité et modifier le prix
    for (let r = 0; r < inputQuantity.length; r++){ //(r++ = rendu avant incrémentation, ++r rend après incrémentation)
        inputQuantity[r].addEventListener("change", (event) => { //On écoute le changement de valeur dans l'input
            event.preventDefault();

            // On récupère l'élément à modifier dans [local storage]
            let quantityModif = produitLocalStorage[r].quantiteProduit; // La quantité 
            let qttModifValue = inputQuantity[r].valueAsNumber; // La valeur de l'input 
            const resultFind = produitLocalStorage.find((el) => el.qttModifValue !== quantityModif); // On vérifie que qttModifValue est strictement inégale à quantityModif

            resultFind.quantiteProduit = qttModifValue; //On modifie la quantité initiale par la valeur modifiée
            produitLocalStorage[r].quantiteProduit = resultFind.quantiteProduit; // On modifie la quantité dans le [local storage]

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage)); //On met à jour le [local storage]
            console.log(quantityModif);
        
            // refresh rapide pour afficher instantanément le résultat (quantité et prix totaux)
            location.reload();
        })
    }
};
modifQuantity();  //Grâce à la fonction getTotals() et le refresh rapide, le calcul du prix total est actualisé directement

// Suppression d'un produit du panier (d est une variable locale)
function productCartDelete(){
    let btnSupprimerPanier = document.getElementsByClassName("deleteItem"); //On récupère .deleteItem qui représente le bouton 'supprimer'
    
    //Boucle pour supprimer l'article au 'click' sur le bouton 'supprimer'
    for (let d = 0; d < btnSupprimerPanier.length; d++){
        btnSupprimerPanier[d].addEventListener('click', (event) => {
            event.preventDefault();

            //On sélectionne les éléments à supprimer dans [local storage] par rapport à l'id et la couleur du produit à supprimer
            let supprId = produitLocalStorage[d]._id; //L'id du produit dans [local storage]
            let supprColor = produitLocalStorage[d].couleurProduit; //La couleur du produit dans [local storage]
            produitLocalStorage = produitLocalStorage.filter(el => el._id !== supprId || el.couleurProduit !== supprColor); //On filtre les id et les couleurs à supprimer (ici on dit :"filtrer 'supprId' et 'supprColor' au click sur le bouton 'supprimer'")

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage)); //On met à jour le [local storage]

            //Alerte produit supprimé et refresh rapide
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        });
    }
}
productCartDelete();