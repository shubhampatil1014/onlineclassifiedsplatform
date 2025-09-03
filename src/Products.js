import { useState, useEffect } from "react";
import { getAllProducts } from "./api/Api.js";
import { Link } from "react-router-dom";

function Products() {

    const [products, setProducts] = useState([]);
    const [productsByLocation, setProductsByLocation] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [productsByKeyword, setProductsByKeyword] = useState([]);

    useEffect(() => {
        // ✅ this runs once when component loads (like document.onload)
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts(); // call your API function
                setProducts(data); // update state with API response
                const el = document.getElementById("productList");
                if (el) {
                    el.style.display = "block"; // set display
                }
                const header = document.getElementById("allProducts");
                if (header) {
                    header.style.display = "block"; // set display
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const addToFavourite = (id) => {
        console.log(id)
    }


    return (<div className="main">
    <div className="banner">
                        <img alt="banner" src="images/banner_2.png" width="1200" height="700" style={{ borderRadius: "10px" }} />
                    </div>
    <div id="products" className="products">
        <div className="header" id="byLocation">
            <div className="title">
                <span>Products By Locations</span>
            </div>
            <div className="shopBtn">
            </div>
            <div className="clear-both"></div>
        </div>

        <div className="Product" id="locationWiseProductList">
        </div>


        <div className="header" id="byCategory">
            <div className="title">
                <span>Products By Category</span>
            </div>
            <div className="shopBtn">
            </div>
            <div className="clear-both"></div>
        </div>

        <div className="Product" id="categoryWiseProductList">
        </div>



        <div className="header" id="byKey">
            <div className="title">
                <span>Products By Key</span>
            </div>
            <div className="shopBtn">
            </div>
            <div className="clear-both"></div>
        </div>
        <div className="Product" id="keywordWiseProductList">
        </div>




        <div className="header" id="allProducts">
            <div className="title">
                Products
            </div>
            <div className="shopBtn">
            </div>
        </div>

        <div className="Product" id="productList">
            {products.length > 0 && products.map((product) => (
                <div className='one' key={product.productId}>
                    <Link to={`/product/${product.productId}`}>
                        <div className='pro-img' style={{
                            background: `url(images/${product.categoryName}.png) #eeebe6`,
                            backgroundSize: "260px 250px",
                            backgroundRepeat: "no-repeat",
                        }}></div>
                    </Link>
                    <div className='pro-info'>
                        <a href='#'><label>{product.title}</label></a><br />
                        {product.description}<br />
                        <span className='price'>Rs. {product.price}</span>
                    </div>
                    <div className='buttons'>
                        <a href={`product.html?productId=${product.productId}`}>
                            <button value='owner' title='Owner Information'>MORE INFO.</button>
                        </a>
                        <button id='fav' value='favorite' title='add to favorites' onClick={() => addToFavourite(product.productId)}>
                            <img id={`favourite${product.productId}`} className={`favourite${product.productId}`} src='images/unliked.png' alt='favorite' width='16' height='16' />
                        </button>
                    </div>
                </div>
            ))

            }
            <div className='clear-both'></div>
        </div>

        <div className="clear-both"></div>
        <div className="load-more-wrapper">
            <button id="load-more" className="load-more-btn"
                onClick={() => alert("abc")}>▼ Load More ▼</button>
        </div>

    </div></div>);
}

export default Products;