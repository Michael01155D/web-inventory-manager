//receives Inventory object's array of products to ensure serial codes and product names are unique

export const generateSerialCode = (products) => {
    const alpha = "abcdefghijklmnopqrstuvwxyz".split("").map(char => char + char.toUpperCase()).join("").split("");
    const num = "0123456789".split("");
    let code = "";
    do {
        for (let i = 0; i < 12; i++) {
            if (i % 2 == 0) {
                const randLetterIndex = Math.floor(Math.random() * 52);
                code += alpha[randLetterIndex];
            } else {
                const randNumIndex = Math.floor(Math.random() * 9);
                code += num[randNumIndex];
            }
        } 
        //ensure an existing product doesn't have the serialCode already
    } while (products.map(product => product.serialCode).includes(code));
    
//quick combinatoric check: 6 numbers & 6 letters w. repeats. possible combinations = 10^6 * 52^6: 19.7 billion * 100,000 codes possible. much greater than max array length possible
    return code;
};

const generateName = (products) => {
    const defaultNames = [
        "Green Apple",
        "Red Apple",
        "Yellow Apple",
        "Banana",
        "Pineapple",
        "Avocado",
        "Orange",
        "Bread",
        "Egg Carton",
        "1% Milk",
        "2% Milk",
        "Greek Yogurt",
        "Frozen Pizza",
        "Blueberry Container",
        "Tomato",
        "Orange Juice",
        "Tomato Juice",
        "Lime",
        "Lemon",
        "Kale",
        "Ground Beef",
        "Margarine",
        "Butter",
        "Mayonnaise",
        "Mustard",
        "Ketchup",
        "BBQ Sauce",
        "Dry Cat Food",
        "Canned Cat Food",
        "Dry Dog Food",    
        "Dog Treats",
        "Cat Treats",
        "Peanut Butter",
    ]   
    let productName = defaultNames[Math.floor(Math.random() * defaultNames.length)];
    //this fn only called when setting up a default starting inventory, ensure default inventory is never >30 items to avoid possible infinite loop
    while (products.map(product => product.name).includes(productName)) {
        productName = defaultNames[Math.floor(Math.random() * defaultNames.length)];
    }
    return productName;
}

const generateStock = () => {
    return Math.floor(Math.random() * 1000);
}

export const createNewProduct = (products) => {
    return {name: generateName(products), serialCode: generateSerialCode(products), stock: generateStock()}
}