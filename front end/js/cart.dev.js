let productLocalStorage = JSON.parse(localStorage.getItem("cart"));

if (!productLocalStorage) {

    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";

} else {

    for (let i=0; i < productLocalStorage.length; i++) {

        // Création de la balise "article" et insertion dans la section
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", productLocalStorage[i].idKanap);

        // Insertion de l'élément "div" pour l'image produit
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        // Insertion de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = productLocalStorage[i].imgKanap;
        // productImg.alt = productLocalStorage.altImgProduit;
        
        // Insertion de l'élément "div" pour la description produit
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        // Insertion de l'élément "div"
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        // Insertion du titre h2
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = productLocalStorage[i].nameKanap;

        // Insertion de la couleur
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = productLocalStorage[i].colorKanap;
        productColor.style.fontSize = "20px";

        // Insertion du prix
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = productLocalStorage[i].priceKanap + " €";

        // Insertion de l'élément "div"
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        // Insertion de l'élément "div"
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        // Insertion de "Qté : "
        let productQty = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQty);
        productQty.innerHTML = "Qté : ";

        // Insertion de la quantité
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = productLocalStorage[i].qtyKanap;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        // Insertion de l'élément "div"
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        // Insertion de "p" supprimer
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
        productSupprimer.addEventListener("click", (e) => {
            e.preventDefault;
        
            // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
            let deleteId = productLocalStorage[i].idKanap;
            let deleteColor = productLocalStorage[i].colorKanap;

            // filtrer l'élément cliqué par le bouton supprimer
            productLocalStorage = productLocalStorage.filter( elt => elt.idKanap !== deleteId || elt.colorKanap !== deleteColor);

            // envoyer les nouvelles données dans le localStorage
            localStorage.setItem('cart', JSON.stringify(productLocalStorage));               

            // avertir de la suppression et recharger la page
            alert('Votre article a bien été supprimé.');
            
            //Si pas de produits dans le local storage on affiche que le panier est vide
            if (productLocalStorage.length === 0) {
                localStorage.clear();
            }
            //Refresh rapide de la page
            location.reload();
        });
    }
}

function getTotals(){

    // Récupération du total des quantités
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }
    
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;

    // Récupération du prix total
    totalPrice = 0;
    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * productLocalStorage[i].priceKanap);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}
getTotals();


function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k= 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = productLocalStorage[k].qtyKanap;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = productLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.qtyKanap = qttModifValue;
            productLocalStorage[k].qtyKanap = resultFind.qtyKanap;

            localStorage.setItem("cart", JSON.stringify(productLocalStorage));
        
            // refresh rapide
            location.reload();
        })
    }
}
modifyQtt();


//Instauration formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();

function postForm() {
    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
    event.preventDefault();
  
    // je récupère les données du formulaire dans un objet
    const contact = {
      firstName : document.getElementById('firstName').value,
      lastName : document.getElementById('lastName').value,
      address : document.getElementById('address').value,
      city : document.getElementById('city').value,
      email : document.getElementById('email').value
    }

    //Construction d'un array d'id depuis le local storage
    let products = [];
    for (let i = 0; i<productLocalStorage.length;i++) {
        products.push(productLocalStorage[i].idKanap);
    }
    console.log(products);
  
    // je mets les valeurs du formulaire et les produits sélectionnés
    // dans un objet...
    const sendFormData = {
      contact,
      products,
    }
  
    // j'envoie le formulaire + localStorage (sendFormData) 
    // ... que j'envoie au serveur
  
    const options = {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: { 
        'Content-Type': 'application/json',
      }
    };
  
    fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id='+ data.orderId;
      });
  
  }); // fin eventListener postForm
  } // fin envoi du formulaire postForm
  postForm();
