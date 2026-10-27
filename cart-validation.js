export function validateCart (cart){
    if(!Array.isArray(cart)){
            const errorMessage = "Invalid saved cart format"
            throw errorMessage;
        }
        cart.forEach((product) => {if(typeof product !== "object" || product === null){
            const errorMessage = "Invalid cart item";
            throw errorMessage;}
        if(typeof product.id !== "number" || typeof product.title !== "string" || !Number.isInteger(product.id) || product.id <= 0){
            const errorMessage = "Invalid cart item";
            throw errorMessage;}
        if(typeof product.price !== "number" || product.price < 0 || product.quantity <= 0 || typeof product.quantity !== "number" || !Number.isInteger(product.quantity) || !Number.isFinite(product.price)){
            const errorMessage = "Invalid cart item";
            throw errorMessage;}
        if(product.title.trim() === ""){
            const errorMessage = "Invalid product name";
            throw errorMessage;}
        })
}