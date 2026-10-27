import { trueBasket} from "./data.js";
import { showSum, emptyBasct, bascetNum, counter } from "./cart-stats.js";
import { validateCart } from "./cart-validation.js";
const emptyBascet = document.querySelector("#emptyBascet");
const numBascetInBasct = document.querySelector("#sum-prod");
const endOrderButton = document.querySelector("#end-order");
const modalWindow = document.querySelector("#windowAfterOrder");
const closeModal = document.querySelector("#closeWindow");
const ulToEndOrder = document.querySelector("#ulToEndOrder");
const numPriceBasc = document.querySelector("#sum-price");
const bascetUl = document.querySelector("#inBascet");
const sumProdEnd = document.querySelector("#sum-prod-end-order");
const sumPriceEnd = document.querySelector("#sum-price-end-order");
const errorToLoad = document.querySelector("#catchErrorBasct")


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



function bascetShowToSite (){
bascetUl.textContent = "";
trueBasket.forEach((product) => 
    {try{
    function slowDelet(){
        endOrderButton.disabled = true;
        const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const allButton = bascetUl.querySelectorAll("button");
        allButton.forEach(button => button.disabled = true);
        if(motionPreference.matches){
           return finishDelete ()}

        liForBascet.addEventListener("transitionend", (event) => {
        if(event.target === liForBascet && event.propertyName === "opacity")
            {   
                finishDelete ();
            }
        })
        liForBascet.classList.add("disappear");
    }

    function finishDelete (){
        const index = trueBasket.indexOf(product);
        let productForFocus;
        if(trueBasket[index + 1]  !== undefined)
            {productForFocus = trueBasket[index + 1]}
        else{productForFocus = trueBasket[index - 1]}
        trueBasket.splice(index, 1);
        save();
        
        if(productForFocus  === undefined)
            {const Continue = document.querySelector(".backToMain");
            Continue.focus();
            }
        else{findAtrib(productForFocus.id, "remove")}
                
    }
    const liForBascet = document.createElement("li");
    liForBascet.className = "cart-item";
    liForBascet.setAttribute("data-id", product.id);
    
   
    
    function findAtrib(id, action){
        const selector = `[data-id="${id}"] [data-action="${action}"]`;
        const findedSelec = bascetUl.querySelector(selector);
        if(findedSelec !== null){findedSelec.focus();}
    }
    const titleToProd = document.createElement("span");
    titleToProd.className = "TitleInBascet";
    const priceToProd = document.createElement("span");
    priceToProd.className = "priceInBascet";
    const quantityToProd = document.createElement("span")
    quantityToProd.className = "quantityInBascet";
    const addOneButton = document.createElement("button")
    addOneButton.type = "button";
    addOneButton.setAttribute("data-action", "increase");
    addOneButton.textContent = " +1";
    addOneButton.className = "addOne";
    addOneButton.setAttribute("aria-label", `Increase quantity of ${product.title}`);
    addOneButton.addEventListener("click", () => {
        product.quantity++;
        save();
        findAtrib(product.id, "increase");
    });
    const deltOneButton = document.createElement("button")
    deltOneButton.type = "button";
    deltOneButton.setAttribute("data-action", "decrease");
    deltOneButton.textContent = " -1";
    deltOneButton.className = "addOne";
    deltOneButton.setAttribute("aria-label", `Decrease quantity of ${product.title}`);
    deltOneButton.addEventListener("click", () => {
        product.quantity--;
        if(product.quantity === 0){
            return slowDelet();
        }
        save();
        findAtrib(product.id, "decrease");
    });

    const deleteButton = document.createElement("button")
    deleteButton.type = "button";
    deleteButton.setAttribute("data-action", "remove");
    deleteButton.textContent = "X";
    deleteButton.setAttribute("aria-label", `Remove ${product.title} from cart`);
    deleteButton.className = "deleteFromBascetButton";
    deleteButton.addEventListener("click", () => { 
        slowDelet();
        
    });

    const sumOfPrice =  product.price*product.quantity;
    titleToProd.append(`${product?.title ?? "Product name unavailable"}`);
    priceToProd.append(`${product?.price ?? "Price unavailable"}\u00A0CZK/item`);
    quantityToProd.append(`${product?.quantity ?? "Quantity unavailable"}`);

    const priceAndTitle = document.createElement("span");
    priceAndTitle.append(titleToProd, priceToProd);
    priceAndTitle.className = "titleAndPrice";

    const addAndDeltQuan = document.createElement("span");
    addAndDeltQuan.append(deltOneButton, quantityToProd, addOneButton);
    addAndDeltQuan.className = "addAndDelt";

    const sumPrice = document.createElement("span");
    sumPrice.append(`${sumOfPrice}\u00A0CZK`);
    sumPrice.className = "sumPrice";

    const sumAndDelet = document.createElement("span");
    sumAndDelet.append(sumPrice, deleteButton);
    sumAndDelet.className = "sumAndDelet";

   

    liForBascet.append(priceAndTitle, addAndDeltQuan, sumAndDelet);
    bascetUl.append(liForBascet);}
    catch(error){
        console.error(error)
        }
    })
}

endOrderButton.addEventListener("click", () => {
    showToEndOrder();
    modalWindow.showModal();
});
closeModal.addEventListener("click", () => modalWindow.close());

function show() {
if(trueBasket.length === 0)
    {endOrderButton.disabled = true}
else{endOrderButton.disabled = false;}
bascetShowToSite ();
showSum(trueBasket, numPriceBasc);
emptyBasct(trueBasket, emptyBascet);
bascetNum(trueBasket, numBascetInBasct);
};

function showToEndOrder(){
    ulToEndOrder.textContent = "";
    const counters = counter(trueBasket);
    sumProdEnd.textContent = counters.quantity;
    sumPriceEnd.textContent = `${counters.price}\u00A0CZK`
    trueBasket.forEach(product =>{
        const liForBascet = document.createElement("li");
        const titleToProd = document.createElement("span");
        const sumPrice = document.createElement("span");
        const quantityToProd = document.createElement("span")
        titleToProd.append(`${product?.title ?? "Product name unavailable"}`);
        sumPrice .append(`${product?.price*product?.quantity ?? "Price unavailable"}\u00A0CZK`);
        quantityToProd.append(`${product?.quantity ?? "Quantity unavailable"}`);
        liForBascet.append(titleToProd," x ", quantityToProd," - ", sumPrice);
        ulToEndOrder.append(liForBascet);
}
    )
}

function save() {
    localStorage.setItem("catalog-cart", JSON.stringify(trueBasket));
    show();
};

show();