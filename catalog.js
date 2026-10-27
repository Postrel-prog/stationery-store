import { products,  trueBasket} from "./data.js"
import { addToSite, search, filterCheck, filterPrice} from "./catalog-functions.js"
import { showSum, bascetNum} from "./cart-stats.js";
import { validateCart } from "./cart-validation.js";

const ulFromSite = document.querySelector("#products-to-site");
const searchInput = document.querySelector("#input-for-search")
const searchButtonBackup = document.querySelector("#search-button-back")
const formSearch = document.querySelector("#form-for-search")
const placeForError = document.querySelector("#error-text")

const checkSelector = document.querySelector("#products-check")
const checlPrice = document.querySelector("#products-check-price")
const numBascet = document.querySelector("#num-bascet")
const numPriceBasc = document.querySelector("#sum-price")
const errorToLoad = document.querySelector("#catchError")


addToSite(products, ulFromSite, numPriceBasc, numBascet);


try{
if(localStorage.getItem("catalog-cart") !== null){
    errorToLoad.textContent = "";
    const oldBask = localStorage.getItem("catalog-cart");
    const returnOldBask = JSON.parse(oldBask); 
    validateCart (returnOldBask);
    returnOldBask.forEach((oldProd) => trueBasket.push(oldProd));
}
}
catch(error){
        errorToLoad.textContent = "We couldn’t restore your saved cart. You can add products again.";
        console.error(error);
}



bascetNum(trueBasket, numBascet);
showSum(trueBasket, numPriceBasc);


formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    placeForError.textContent = "";
    let filteredProdSrock = search(products, searchInput.value);
    filteredProdSrock = filterCheck(checkSelector.value, filteredProdSrock);
    filterPrice (checlPrice.value, filteredProdSrock)
    if (filteredProdSrock.length === 0){return ulFromSite.textContent = "No products found"}
    addToSite(filteredProdSrock, ulFromSite, numPriceBasc, numBascet);
})

searchButtonBackup.addEventListener("click", () => {
    addToSite(products, ulFromSite, numPriceBasc, numBascet);
    searchInput.value = "";
    checkSelector.value = "all-product";
    checlPrice.value = "like-base";
})