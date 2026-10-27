

export function counter (arrayBasct){
    const totalPrice =  arrayBasct.map(({price, quantity}) => price*quantity).reduce((total, num) => total + num, 0);
    const totalCounter = arrayBasct.map(({quantity}) =>  quantity).reduce((total, quantity) =>  total = total + quantity, 0);
    const newObjct = {quantity: totalCounter, price: totalPrice};
    return newObjct;
}

export function showSum(array, whereShow){
    const numForBasct = counter(array);
    whereShow.textContent = `${numForBasct.price}\u00A0CZK`;}

export function bascetNum(array, whereShow){
        const bascetNum = counter(array);
        whereShow.textContent = bascetNum.quantity;
    };

export function emptyBasct(array, wereShow){
    wereShow.textContent = "";
    if(counter(array).quantity <= 0){
        const firstText = document.createElement("p");
        firstText.append(`Your cart is empty`);
        firstText.className = "firstText";
        const secndText = document.createElement("p");
        secndText.append(`Add products from the catalogue to see them here.`);
        secndText.className = "secndText";
        const allText = document.createElement("div");
        allText.append(firstText, secndText);
        wereShow.append(allText);    }
};