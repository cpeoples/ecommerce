import { useNavigate } from 'react-router';
import { useAuth } from '../../context/authContext';
import { isItemInCart } from '../../utils/isItemPresentInCart';
import './wishlist.css'
import { useCart } from '../../context/cartContext';

export const WishlistCard =({data, handleRemoveWishlist}) => {
    const {authState} = useAuth();
    const navigate = useNavigate();
    const {cart, addCartData} = useCart();
    const {_id, title, image, brand, price, originalPrice, ratings} = data
    return (
        <>
            <div className="wishlist-card">
                <img alt={title} src={image} />
                <div className="wishlist-container">
                    <h3>{brand}</h3>
                    <p>{title}</p>
                    <p>{ratings.value} ⭐</p>
                    <div className="price">
                        <h3>{price}</h3>
                        <p>{originalPrice}</p>
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={() => {
                            if (authState.isLoggedIn) {
                                if (isItemInCart(cart, _id)) {
                                    navigate('/cart')
                                }  else {
                                    addCartData(data)
                                }
                            } else {
                                alert('Please login to proceed')
                            }
                        }}>{isItemInCart(cart, _id) ? "Go to Cart" : "Add to Cart"}</button>
                    <button onClick={() => handleRemoveWishlist(_id)}>Remove From Wishlist</button>
                </div>
            </div>
        </>
    )
}