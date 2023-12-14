import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value:product.ratings,
        isHalf:true,
    }
    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.images?.url} alt={product.name} />
            <p>{product.name}</p>
            <span>{`USD ${product.price}`}</span>
        </Link>
    )
}

export default ProductCard
