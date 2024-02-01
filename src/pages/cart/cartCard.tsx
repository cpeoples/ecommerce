import { useNavigate } from 'react-router';
import { useAuth } from '../../context/authContext';
import { useCart } from '../../context/cartContext';
import { useWishlist } from '../../context/wishlistContext';
import { isItemInWishlist } from '../../utils/isItemPresentInWishlist';
import { toast } from 'react-toastify';
import './cart.css';

export const CartCard = ({ data, handleRemoveCart }: any) => {
  const { _id, image, brand, title, qty, price, originalPrice } = data;
  const { changeCartQuantity, isCartUpdate }: any = useCart();
  const { token }: any = useAuth();
  const { wishlist, addWishlistData, isWishlistUpdate }: any = useWishlist();
  const navigate = useNavigate();

  const handleDecrement = () => {
    if (qty > 1 && !isCartUpdate) {
      changeCartQuantity(_id, 'decrement');
    }
  };

  const handleIncrement = () => {
    if (!isCartUpdate) {
      changeCartQuantity(_id, 'increment');
    }
  };

  const handleRemove = () => {
    if (!isCartUpdate) {
      handleRemoveCart(_id);
    }
  };

  const handleWishlist = () => {
    if (token) {
      if (isItemInWishlist(wishlist, _id)) {
        navigate('/wishlist');
      } else {
        addWishlistData(data);
        toast.success('Added to wishlist!');
      }
    } else {
      toast.warning('Please login to proceed');
      navigate('/login');
    }
  };

  return (
    <div className="cart-card">
      <img
        src={image}
        alt={title}
        onClick={() => navigate(`/products/${_id}`)}
      />

      <div className="title">
        <h3>{brand}</h3>
        <p>{title}</p>
      </div>

      <div className="cart-quantity">
        <div className="quantity-select">
          <button disabled={qty <= 1 || isCartUpdate} onClick={handleDecrement}>
            <i className="fa-solid fa-minus fa-xs"></i>
          </button>
          {qty}
          <button onClick={handleIncrement}>
            <i className="fa-solid fa-plus fa-xs"></i>
          </button>
        </div>
        <button disabled={isCartUpdate} onClick={handleRemove}>
          <i className="fa-solid fa-trash-can"></i> Remove
        </button>
      </div>

      <div className="cart-price">
        <h3>Rs.{price}</h3>
        <p>Rs. {originalPrice}</p>
        <button
          className="wishlist-btn"
          disabled={isWishlistUpdate}
          onClick={handleWishlist}
        >
          {isItemInWishlist(wishlist, _id)
            ? 'Go to Wishlist'
            : 'Add to Wishlist'}
        </button>
      </div>
    </div>
  );
};
