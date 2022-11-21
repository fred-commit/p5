//Récupération de l'id via les paramètres de l'url
const idProduct = new URL(window.location.href).searchParams.get("id");

//Récupération des sélecteurs pour les futurs modifications
let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");
let imgProduct = document.querySelector(".item__img");
let img = document.createElement("img");
imgProduct.appendChild(img);

//Récupération de l'article grace a l'id + affichage des données de ce dernier
getArticle();

//Récupération de l'article grace a l'id + affichage des données de ce dernier
async function getArticle() {
     await fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => response.json())    
    .then(product => {
        img.setAttribute("src", product.imageUrl);
        img.setAttribute("alt", product.altTxt);    
        titleProduct.innerHTML = product.name;
        priceProduct.innerHTML = product.price;
        descriptionProduct.innerHTML = product.description;
        document.title = product.name;

        for (let i=0; i < product.colors.length; i++) {
            let color = document.createElement("option");
            color.setAttribute("value", product.colors[i]);
            color.innerHTML = product.colors[i];
            colorsProduct.appendChild(color);
        }  
    });          
}

// Ajouté un article au panier
let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);

function addToCart() {

    const colorChoice = document. querySelector("#colors");
    const quantityChoice = document.querySelector("#quantity");

    if (quantityChoice.value > 0 && quantityChoice.value <=100 && quantityChoice.value != 0 && colorChoice.value != 0) { 

        if (localStorage.getItem("cart")) {
    
            let productCart = JSON.parse(localStorage.getItem("cart"));
            console.log(productCart);

            let idKanap = idProduct;
            let colorKanap = document.querySelector("#colors").value;
            let qtyKanap = document.querySelector("#quantity").value;

            const resultFind = productCart.find(
                (el) => el.idKanap === idProduct && el.colorKanap === colorKanap);
                //Si le produit commandé est déjà dans le panier
                console.log("result find est egal a :");
                console.log(resultFind);
                console.log("fin result find");

                if (resultFind) {
                    console.log("resultfind kanap = " + resultFind.qtyKanap);
                    console.log("qtykanap = " + qtyKanap);
                    let newQuantite = parseInt(qtyKanap) + parseInt(resultFind.qtyKanap);
                    console.log("newQtt est egal a : " + newQuantite);
                    resultFind.qtyKanap = newQuantite;
                    localStorage.setItem("cart", JSON.stringify(productCart));
                    console.log("productCart egal :");
                    console.log(productCart);
                    console.log("fin productCart");
                //Si le produit commandé n'est pas dans le panier
                } else {
                    
                    let productCart = JSON.parse(localStorage.getItem("cart"));

                    let idKanap = idProduct;
                    let nameKanap = document.querySelector("#title").textContent;
                    let colorKanap = document.querySelector("#colors").value;
                    let qtyKanap = document.querySelector("#quantity").value;
                    let imgKanap = img.src; 
                    let altImg = img.alt;
                    let priceKanap = document.querySelector("#price").textContent;
                    
                    console.log(img);
                    console.log(idKanap, nameKanap, colorKanap, qtyKanap, imgKanap, altImg, priceKanap);
                
                    let productCartObj = {
                        idKanap : idProduct,
                        nameKanap : nameKanap,
                        colorKanap : colorKanap,
                        qtyKanap  : qtyKanap,
                        imgKanap : imgKanap,
                        altImg : altImg,
                        priceKanap : priceKanap
                    };
                
                    productCart.push(productCartObj);
                
                    let objCart = JSON.stringify(productCart);
                    localStorage.setItem("cart", objCart);
                
                    alert("Ajouté au panier !");
                }

        } else {

            let productCart = [];

            let idKanap = idProduct;
            let nameKanap = document.querySelector("#title").textContent;
            let colorKanap = document.querySelector("#colors").value;
            let qtyKanap = document.querySelector("#quantity").value;
            let imgKanap = img.src; 
            let altImg = img.alt;
            let priceKanap = document.querySelector("#price").textContent;
            
            console.log(img);
            console.log(idKanap, nameKanap, colorKanap, qtyKanap, imgKanap, altImg, priceKanap);
        
            let productCartObj = {
                idKanap : idProduct,
                nameKanap : nameKanap,
                colorKanap : colorKanap,
                qtyKanap  : qtyKanap,
                imgKanap : imgKanap,
                altImg : altImg,
                priceKanap : priceKanap
            };
        
            productCart.push(productCartObj);
        
            let objCart = JSON.stringify(productCart);
            localStorage.setItem("cart", objCart);
        
            alert("Ajouté au panier !");    
        }
    }
}
