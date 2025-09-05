import { useState, useEffect } from "react";
import { addToFavourites, getAllProducts, getProductsByLocation } from "./api/Api.js";
import { Link } from "react-router-dom";
import { authState } from "./config.js";

function Products() {

    const [products, setProducts] = useState([]);
    const [productsByLocation, setProductsByLocation] = useState([]);
    // const [productsByCategory, setProductsByCategory] = useState([]);
    // const [productsByKeyword, setProductsByKeyword] = useState([]);
    const [allFilteredProducts, setAllFilteredProducts] = useState([]);
    let locationFilter, categoryFilter;
    const params = new URLSearchParams();
    locationFilter = params.get('location');
    categoryFilter = params.get('category');





    useEffect(() => {
        // ✅ this runs once when component loads (like document.onload)

        const fetchAllProducts = async () => {
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
                await showProductsByFilter();
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const getFilteredProducts = async () => {


            if (locationFilter && locationFilter.length > 0) {
                const filteredProducts = await getProductsByLocation();
                setProductsByLocation(filteredProducts);
            }
        };

        const showProductsByFilter = async () => {
            if (categoryFilter) {
                document.querySelector(`select[name="category"]`).value = categoryFilter;
                setAllFilteredProducts(products);
                if (locationFilter) {
                    setAllFilteredProducts(productsByLocation);
                }
            }
            else if (locationFilter) {

            }
        };
        getFilteredProducts();
        fetchAllProducts();
    });

    const addToFavourite = async (id) => {
        try {
            if (authState.isLoggedIn) {
                const isAdded = await addToFavourites(id);
                if (isAdded === "Y") {
                    document.querySelector(`.favourite${id}`).src = "images/liked.png";
                } else if (isAdded === "N") {
                    document.querySelector(`.favourite${id}`).src = "images/unliked.png";
                }
            }
            else {
                document.getElementById("loginpage").style.display = "block";
            }

        } catch (error) {

        }
    }


    return (<div className="main">
        <div className="banner">
            <img alt="banner" src="images/banner_2.png" width="1200" height="700" style={{ borderRadius: "10px" }} />
        </div>
        <div id="products" className="products">
            <div className="header" id="byLocation">
                <div className="title">
                    <span>{locationFilter ? locationFilter : `Products By Locations`}</span>
                </div>
                <div className="shopBtn">
                </div>
                <div className="clear-both"></div>
            </div>

            <div className="Product" id="locationWiseProductList">
                {!categoryFilter && productsByLocation.length > 0 ?
                    (productsByLocation.map((product) => (
                        <div className='one' key={product.productId}>
                            <Link to={`/product/${product.productId}`}>
                                <div className='pro-img' style={{
                                    background: `url(images/${product.categoryName}.png) #eeebe6`,
                                    backgroundSize: "260px 250px",
                                    backgroundRepeat: "no-repeat",
                                }}></div>
                            </Link>
                            <div className='pro-info'>
                                <label>{product.title}</label><br />
                                {product.description}<br />
                                <span className='price'>Rs. {product.price}</span>
                            </div>
                            <div className='buttons'>
                                <Link to={`/product/${product.productId}`}>
                                    <button value='owner' title='Owner Information'>MORE INFO.</button>
                                </Link>
                                <button id='fav' value='favorite' title='add to favorites' onClick={() => addToFavourite(product.productId)}>
                                    <img id={`favourite${product.productId}`} className={`favourite${product.productId}`} src={`images/unliked.png`} alt='favorite' width='16' height='16' />
                                </button>
                            </div>
                        </div>
                    ))) : <><div className="no-results-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="No Results" />
                        <h3>No Results Found</h3>
                        <p>Try a different keyword or check your spelling.</p>
                    </div><div className='clear-both'></div></>}
            </div>


            <div className="header" id="byCategory">
                <div className="title">
                    <span>{categoryFilter ? categoryFilter : `Products By Category`}</span>
                </div>
                <div className="shopBtn">
                </div>
                <div className="clear-both"></div>
            </div>

            <div className="Product" id="categoryWiseProductList">
                {allFilteredProducts.length > 0 ?
                    (allFilteredProducts.map((product) => (
                        <div className='one' key={product.productId}>
                            <Link to={`/product/${product.productId}`}>
                                <div className='pro-img' style={{
                                    background: `url(images/${product.categoryName}.png) #eeebe6`,
                                    backgroundSize: "260px 250px",
                                    backgroundRepeat: "no-repeat",
                                }}></div>
                            </Link>
                            <div className='pro-info'>
                                <label>{product.title}</label><br />
                                {product.description}<br />
                                <span className='price'>Rs. {product.price}</span>
                            </div>
                            <div className='buttons'>
                                <Link to={`/product/${product.productId}`}>
                                    <button value='owner' title='Owner Information'>MORE INFO.</button>
                                </Link>
                                <button id='fav' value='favorite' title='add to favorites' onClick={() => addToFavourite(product.productId)}>
                                    <img id={`favourite${product.productId}`} className={`favourite${product.productId}`} src={`images/unliked.png`} alt='favorite' width='16' height='16' />
                                </button>
                            </div>
                        </div>
                    ))) : <><div className="no-results-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="No Results" />
                        <h3>No Results Found</h3>
                        <p>Try a different keyword or check your spelling.</p>
                    </div><div className='clear-both'></div></>}
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
                            <label>{product.title}</label><br />
                            {product.description}<br />
                            <span className='price'>Rs. {product.price}</span>
                        </div>
                        <div className='buttons'>
                            <Link to={`/product/${product.productId}`}>
                                <button value='owner' title='Owner Information'>MORE INFO.</button>
                            </Link>
                            <button id='fav' value='favorite' title='add to favorites' onClick={() => addToFavourite(product.productId)}>
                                <img id={`favourite${product.productId}`} className={`favourite${product.productId}`} src={`images/unliked.png`} alt='favorite' width='16' height='16' />
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