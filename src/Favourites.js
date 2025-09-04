import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavProducts } from "./api/Api";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavouriteProducts = async () => {
      try {
        const data = await getFavProducts();
        // If API returns [{ favProduct: {...} }]
        const mapped = data.map((f) => f.favProduct || f);
        setFavourites(mapped);
      } catch (error) {
        console.error("Failed to fetch favourites", error);
      } finally {
        setLoading(false);
      }
    };

    getFavouriteProducts();
  }, []);

  const addToFavourite = async (productId) => {
    try {
      const res = await fetch(`/addToFavourite/${productId}`, {
        method: "POST",
        credentials: "include", // important if you use Spring Boot session cookies
      });

      if (!res.ok) {
        throw new Error("Failed to add favourite");
      }

      // Optional: update UI instantly (optimistic update)
      setFavourites((prev) =>
        prev.map((p) =>
          p.productId === productId ? { ...p, isFavourite: true } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading favourites...</div>;

  return (
    <div className="main" style={{ minHeight: "500px" }}>
      <div className="banner">
        <div id="pet-clothing" className="products">
          <div className="header" style={{ display: favourites.length ? "block" : "none" }}>
            <div className="title" style={{ paddingLeft: "15px" }}>
              Favourites
            </div>
          </div>

          <div className="Product" style={{ display: favourites.length ? "block" : "none" }}>
            {favourites.length > 0 &&
              favourites.map((product) => (
                <div className="one" key={product.productId}>
                  <Link to={`/product/${product.productId}`}>
                    <div
                      className="pro-img"
                      style={{
                        background: `url(images/${product.categoryName}.png) #eeebe6`,
                        backgroundSize: "260px 250px",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </Link>

                  <div className="pro-info">
                    <label>{product.title}</label>
                    <br />
                    {product.description}
                    <br />
                    <span className="price">Rs. {product.price}</span>
                  </div>

                  <div className="buttons">
                    <Link to={`/product/${product.productId}`}>
                      <button value="owner" title="Owner Information">
                        MORE INFO.
                      </button>
                    </Link>

                    <button
                      id="fav"
                      value="favorite"
                      title="add to favorites"
                      onClick={() => addToFavourite(product.productId)}
                    >
                      <img
                        id={`favourite${product.productId}`}
                        className={`favourite${product.productId}`}
                        src="images/liked.png"
                        alt="favorite"
                        width="16"
                        height="16"
                      />
                    </button>
                  </div>
                </div>
              ))}
            <div className="clear-both"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
