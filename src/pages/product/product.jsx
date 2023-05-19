import { ProductCard } from '../../components/product-card/productCard'
import { SideBar } from '../../components/sidebar/sidebar'
import './product.css'
import { useState } from 'react'
import { useFilters } from '../../context/filterContext'

export const Product = () => {
    const {filteredData} = useFilters();
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    return (
        <>
            <div className="product">
                <div className='text-filter'>
                    <p className='text'>Home <i class="fa-solid fa-angle-right fa-xs"></i> <span>Browse Products</span></p>
                    <button onClick={() => setIsFilterVisible(prev => !prev)}><i class="fa-solid fa-filter" style={{color: '#e80071'}}></i> Filters</button>
                </div>

                <div className='products'>
                    <div className='sidebar'>
                        <SideBar isFilterVisible={isFilterVisible} />
                    </div>
                    <div className='product-list'>
                        {filteredData.map(product => {
                            const {_id, title, brand, price, originalPrice, ratings, image} = product;
                            return (
                                <li key={_id}>
                                    <ProductCard _id={_id} title={title} brand={brand} price={price} originalPrice={originalPrice} image={image} ratings={ratings} />
                                </li>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}