import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addToFavourites, getProductsBySearch } from "./api/Api";
import { authState, STATIC_CONTENT_PATH } from "./config";

export default function SearchResults() {
    const [searchedProducts, setSearchedProducts] = useState([]);
    const { keyword } = useParams();

    useEffect(() => {
        const fetchSearchedProducts = async () => {
            const response = await getProductsBySearch(keyword);
            setSearchedProducts(response);
        }
        fetchSearchedProducts();
    }, [keyword]);

    const addToFavourite = async (id) => {
        try {
            if (authState.isLoggedIn) {
                const isAdded = await addToFavourites(id);
                if (isAdded === "Y") {
                    document.querySelector(`.favourite${id}`).src = "/images/liked.png";
                } else if (isAdded === "N") {
                    document.querySelector(`.favourite${id}`).src = "/images/unliked.png";
                }
            }
            else {
                document.getElementById("loginpage").style.display = "block";
            }

        } catch (error) {

        }
    }

    return (
        <div id="products" className="products">
            <div className="header" id="byKeyword" style={{ display: keyword ? "block" : "none" }}>
                <div className="title">
                    <span>{keyword ? `Results For : ${keyword}` : `Products By Keyword`}</span>
                </div>
                <div className="shopBtn">
                </div>
                <div className="clear-both"></div>
            </div>
            <div className="Product" id="keywordWiseProductList" style={{ display: keyword ? "block" : "none" }}>
                {searchedProducts.length > 0 ?
                    (searchedProducts.map((product) => (
                        <div className='one' key={product.productId}>
                            <Link to={`/product/${product.productId}`}>
                                <div className='pro-img' style={{
                                    background: `url(${STATIC_CONTENT_PATH}/media/images/${product.productImage}) #eeebe6`,
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
                                    <img id={`favourite${product.productId}`} className={`favourite${product.productId}`} src={`/images/unliked.png`} alt='favorite' width='16' height='16' />
                                </button>
                            </div>
                        </div>
                    ))) : keyword ? <><div className="no-results-box">
                        <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="No Results" />
                        <h3>No Results Found</h3>
                        <p>Try a different keyword or check your spelling.</p>
                    </div></> : ``}
                <div className='clear-both'></div>
            </div>
        </div>
    );
}