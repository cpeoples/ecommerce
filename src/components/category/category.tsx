import './category.css';
import { useFilters } from '../../context/filterContext';
import { useNavigate } from 'react-router';
import { useProducts } from '../../context/productContext';

export const Category = () => {
  const { productState }: any = useProducts();
  const { filterDispatch }: any = useFilters();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    filterDispatch({ type: 'clear_filters' });
    filterDispatch({ type: 'filter_by_category', payload: categoryName });
    navigate('/products');
  };

  return (
    <>
      <h2>Currated Picks ✨</h2>

      <div className="category">
        {productState?.categoriesData.length !== 0 &&
          productState?.categoriesData.map((category: any) => (
            <div
              key={category.categoryName}
              onClick={() => handleCategoryClick(category.categoryName)}
            >
              <img src={category.image} alt={category.categoryName} />

              <p>
                {category.categoryName}{' '}
                <i className="fa-solid fa-arrow-right"></i>
              </p>
            </div>
          ))}
      </div>
    </>
  );
};
