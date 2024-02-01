import { useNavigate } from 'react-router';
import './productCard.css';
import { useCart } from '../../context/cartContext';
import { useAuth } from '../../context/authContext';
import { isItemInCart } from '../../utils/isItemPresentInCart';
import { isItemInWishlist } from '../../utils/isItemPresentInWishlist';
import { toast } from 'react-toastify';
import { useWishlist } from '../../context/wishlistContext';
import { useThrottle } from '../../utils/useThrottle';

interface ProductCardProps {
  data: {
    _id: string;
    image: string;
    title: string;
    brand: string;
    price: number;
    originalPrice: number;
    ratings: {
      value: number;
    };
    outOfStock: boolean;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ data }: any) => {
  const {
    _id,
    image,
    title,
    brand,
    price,
    originalPrice,
    ratings,
    outOfStock,
  } = data;
  const navigate = useNavigate();
  const { cart, addCartData, isCartUpdate } = useCart();
  const {
    wishlist,
    addWishlistData,
    removeWishlistData,
    isWishlistUpdate,
  }: any = useWishlist();
  const { token }: any = useAuth();

  const addToWishlist = () => {
    if (token) {
      if (!isItemInWishlist(wishlist, _id)) {
        addWishlistData(data);
        toast.success('Added to wishlist!');
      }
    } else {
      toast.warning('Please login to proceed');
      navigate('/login');
    }
  };

  const addWishlistHandler = useThrottle(addToWishlist, 400);

  const handleCartButtonClick = () => {
    if (token) {
      if (isItemInCart(cart, _id)) {
        navigate('/cart');
      } else {
        addCartData(data);
        toast.success('Added to cart!');
      }
    } else {
      toast.warning('Please login to proceed!');
      navigate('/login');
    }
  };

  return (
    <div className="product-card">
      {outOfStock && <span className="overlay">OUT OF STOCK</span>}
      {isItemInWishlist(wishlist, _id) ? (
        <i
          className="fa-solid fa-heart fa-lg add-wishlist"
          style={{ color: '#ff0000' }}
          onClick={() => {
            removeWishlistData(_id);
            toast.warning('Item removed from wishlist!');
          }}
        ></i>
      ) : (
        <i
          className="fa-regular fa-heart fa-lg add-wishlist"
          aria-disabled={isWishlistUpdate}
          onClick={addWishlistHandler}
        ></i>
      )}

      <div onClick={() => navigate(`/products/${_id}`)}>
        <img src={image} alt={title} />

        <h3>{brand}</h3>

        <p className="product-title">
          {title.length > 50 ? title.substring(0, 50) + '...' : title}
        </p>

        <div className="price-rating">
          <div className="price">
            <h3>₹{price}</h3>

            <p>₹{originalPrice}</p>
          </div>

          <p>{ratings?.value} ⭐</p>
        </div>
      </div>

      <button
        disabled={outOfStock || isCartUpdate}
        onClick={handleCartButtonClick}
      >
        <i className="fa-solid fa-cart-shopping"></i>{' '}
        {isItemInCart(cart, _id) ? 'Go to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};
