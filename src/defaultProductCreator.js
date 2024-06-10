//receives Inventory array of product objects to ensure serial codes and product names are unique

const generateName = (products) => {
    if (products.length > 30) {return "error"};
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
   
    while (products.map(product => product.name).includes(productName)) {
        productName = defaultNames[Math.floor(Math.random() * defaultNames.length)];
    }
    return productName;
}

const generateStock = () => {
    return Math.floor(Math.random() * 1000);
}

export const createDefaultProduct = (products) => {
    return {name: generateName(products), stock: generateStock()}
}