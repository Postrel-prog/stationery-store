import { trueBasket } from "./data.js";
import { showSum, bascetNum} from "./cart-stats.js";

export function addToSite(array, placeForText, allSum, quantity){
placeForText.textContent = "";
array.forEach((product) => {
    const readuLi = creatureLi(product, allSum, quantity);
    placeForText.append(readuLi);
});};

function creatureLi (product, allSum, quantity){
    const liToSite = document.createElement("li");
    liToSite.className = "liForProd";

    const h2ToProd = document.createElement("h2");
    h2ToProd.className = "h2ProdTitle";

    const priceToProd = document.createElement("p");
    priceToProd.className = "priceToList";

    const availableToProd = document.createElement("p");

    const divToOriceAndAvalb = document.createElement("div")
    divToOriceAndAvalb.className = "divToPrice";

    const price = document.createElement ("span")
    price.className = "priceText";
    price.textContent = "Price:"

    const basket = document.createElement("button")
    basket.type = "button";
    basket.textContent = "Add to cart";
    basket.className = "addToBasket"
    basket.addEventListener("click", () => {
        if(trueBasket.some(({id}) => id === product.id)){
            const timesProd = trueBasket.find(({id}) => id === product.id);
            timesProd.quantity++}
        else{ 
            const timesProd = {id: product.id, title: product.title, price: product.price, quantity: 1};
            trueBasket.push(timesProd);
            }
        localStorage.setItem("catalog-cart", JSON.stringify(trueBasket));
        showSum(trueBasket, allSum);
        bascetNum(trueBasket, quantity);
    })

    h2ToProd.append(`${product?.title ?? "Product name unavailable"}`);
    priceToProd.append(price, ` ${product?.price ?? "Price unavailable"}\u00A0CZK`);
    if(product.available){ availableToProd.className = "available"; availableToProd.append("In stock")}
    else{ availableToProd.className = "notAvailable"; availableToProd.append("Out of stock")}
    divToOriceAndAvalb.append(priceToProd, availableToProd)
    if (availableToProd.className === "notAvailable"){basket.disabled = true; basket.textContent = "Unavailable";}
    liToSite.append(h2ToProd, divToOriceAndAvalb, basket);
    return liToSite;
}

export function search(array, searchData){
    const searchInputText = searchData.toLowerCase().trim();
    const filteredProd = array.filter(({title}) => title.toLowerCase().includes(searchInputText))
    return filteredProd;
}

export function filterCheck(checker, array){
    if(checker === "in-stocks"){
        const filteredProdSrocks = array.filter(({available}) => available)
        return filteredProdSrocks;
    }
    if(checker === "not-in-stocks"){
        const filteredProdSrocks = array.filter(({available}) => !available)
        return filteredProdSrocks;
    }
    if(checker === "all-product"){
        return array;
    }
}

export function filterPrice (checkPrice, array){
    if(checkPrice === "like-base"){return array}
    if(checkPrice === "first-cheap"){return array.sort((a, b) => a.price - b.price)}
    if(checkPrice === "first-expensive"){return array.sort((a, b) => b.price - a.price)}
}
