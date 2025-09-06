import { useState, useEffect } from "react";
import { addToFavourites, getAllProducts, getProductsByLocation } from "./api/Api.js";
import { Link, useLocation } from "react-router-dom";
import { authState } from "./config.js";

function Products() {

    const [products, setProducts] = useState([]);
    const [productsByLocation, setProductsByLocation] = useState([]);
    const location = useLocation();
    // const [productsByCategory, setProductsByCategory] = useState([]);
    // const [productsByKeyword, setProductsByKeyword] = useState([]);
    const [allFilteredProducts, setAllFilteredProducts] = useState([]);
    let locationFilter, categoryFilter, filteredProducts=[];
    const params = new URLSearchParams(location.search);
    locationFilter = params.get('location');
    categoryFilter = params.get('category');

    useEffect(() => {
        // ✅ this runs once when component loads (like document.onload)

        const fetchAllProducts = async () => {
            try {
                const data = await getAllProducts(); // call your API function
                filteredProducts = data;
                setProducts(data); // update state with API response
                if (locationFilter && locationFilter.length > 0) {
                    filteredProducts = await getProductsByLocation(locationFilter);
                    setProductsByLocation(filteredProducts);
                    document.getElementById("locationName").innerHTML=locationFilter;
					document.getElementById("locFilter").style.display="block";
                    console.log(productsByLocation);
                }

                if (categoryFilter) {
                    document.querySelector(`select[name="category"]`).value = categoryFilter;
                    setAllFilteredProducts(filteredProducts);
                    if (locationFilter) {
                        setProductsByLocation([]);
                    }
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchAllProducts();
    }, [categoryFilter,locationFilter]);

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
            <div className="header" id="byLocation" style={{display : locationFilter && !categoryFilter ? "block" : "none" }}>
                <div className="title">
                    <span>{locationFilter ? `Results For : ${locationFilter}` : `Products By Locations`}</span>
                </div>
                <div className="shopBtn">
                </div>
                <div className="clear-both"></div>
            </div>

            <div className="Product" id="locationWiseProductList" style={{display : locationFilter && !categoryFilter ? "block" : "none" }}>
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
                    ))) : locationFilter && !categoryFilter ? <><div className="no-results-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="No Results" />
                        <h3>No Results Found</h3>
                        <p>Try a different keyword or check your spelling.</p>
                    </div></> : ``}
                    <div className='clear-both'></div>
            </div>


            <div className="header" id="byCategory" style={{display : categoryFilter ? "block" : "none" }}>
                <div className="title">
                    <span>{categoryFilter && locationFilter ? `${categoryFilter}s From ${locationFilter}` : (categoryFilter ? `${categoryFilter}s`:``)}</span>
                </div>
                <div className="shopBtn">
                </div>
                <div className="clear-both"></div>
            </div>

            <div className="Product" id="categoryWiseProductList" style={{display : categoryFilter ? "block" : "none" }}>
                {allFilteredProducts.length > 0 ?
                    (allFilteredProducts.map((product) => (product.categoryName === categoryFilter ?
                        (<div className='one' key={product.productId}>
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
                        ) : ``))) : categoryFilter ? <><div className="no-results-box">
                            <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="No Results" />
                            <h3>No Results Found</h3>
                            <p>Try a different keyword or check your spelling.</p>
                        </div></> : ``}
                        <div className='clear-both'></div>
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




            <div className="header" id="allProducts" style={{display : products.length > 0 ? "block" : "none" }}>
                <div className="title">
                    Products
                </div>
                <div className="shopBtn">
                </div>
            </div>

            <div className="Product" id="productList" style={{display : products.length > 0 ? "block" : "none" }}>
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