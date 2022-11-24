//La récupération du tableau de produits disponibles
getProducts();


//La création des articles via la liste récupérée précédemment
creationProducts();

async function getProducts() {
    let products = await fetch('http://localhost:3000/api/products');
    console.log("Les produits ont été récupérés !")
    return products.json();
}

async function creationProducts() {
    let result = await getProducts()
    .then( (product) => {
        for (let i=0; i < product.length; i++) {		

            //l'insertion de l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${product[i]._id}`;

            //l'insertion de l'élément "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            //l'insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = product[i].imageUrl;
            productImg.alt = product[i].altTxt;

            //l'insertion du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = product[i].name;

            //l'insertion de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = product[i].description;
        }
    });
    console.log("Les produits ont été crées !");
}
