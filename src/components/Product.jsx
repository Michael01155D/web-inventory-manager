const Product = ({product}) => {
    return(
        <p>Name: {product.name} | Current Stock: {product.stock} | Serial Code: {product.serialCode}</p>
    )
}

export default Product;