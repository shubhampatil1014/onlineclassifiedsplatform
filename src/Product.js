import { useState, useEffect } from "react";
import { getProductDetails } from "./api/Api";
import { useParams } from "react-router-dom";
import { STATIC_CONTENT_PATH } from "./config";
import { authState } from "./config";

export default function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState("");

    useEffect(() => {
        // ✅ this runs once when component loads (like document.onload)
        const fetchProduct = async () => {
            try {
                const data = await getProductDetails(productId); // call your API function
                setProduct(data); // update state with API response
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div className="main" style={{ minHeight: "500px" }}>
            <div className="product-details-container"
                style={{ display: "flex", gap: "40px", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", background: "#fff" }}>
                <img src="/images/productNotFound.jpg" alt="" width="960" />
            </div>
        </div>
    }

    // parse categoryDetails if present
    let categoryDetails = {};
    if (product.categoryDetails) {
        const cleaned = product.categoryDetails.replace(/[{}]/g, "").trim();
        const pairs = cleaned.split(",");
        pairs.forEach((pair) => {
            const [key, value] = pair.split(":").map((s) => s.trim());
            if (key && value) categoryDetails[key] = value;
        });
    }

    const openChat = function (ownerId,name){
	// dataLayer.push({
	//   'event': 'openChat',
	//   'pageCategory': 'Product',
	//   'user': {
	// 	'name' : name,
	// 	'id' : ownerId
	// }
	// });

	if(authState.isLoggedIn){
		window.location.href=`/chats?ownerId=${ownerId}&name=${name}`;
	}else{
		document.getElementById("loginpage").style.display="block";
	}
	
}

    return (

        <div className="main" style={{ minHeight: "500px" }}>
            <div className="product-details-container"
                style={{ display: "flex", gap: "40px", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", background: "#fff" }}>

                <div className="product-content"
                    style={{ flex: "2", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <div className="product-image-box" style={{ flex: 1 }}>
                        <img id="productImage" src={product.productImage ? `${STATIC_CONTENT_PATH}/media/images/${product.productImage}` : `/images/${product.categoryName}.png`}
                            alt="Product"
                            style={{ maxWidth: "100%", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)" }} />
                    </div>
                    <div className="product-info-box" style={{ flex: 2 }}>
                        <h2 id="productTitle"
                            style={{ fontFamily: "'Comic Sans MS', cursive", marginBottom: "8px" }}>{product.title}</h2>
                        <p id="productDescription" style={{ margin: "5px 0" }}>{product.description}</p>
                        <p>
                            <strong>Category:</strong> <span id="productCategoryName">{product.categoryName}</span>
                        </p>
                        <div id="productCategoryDetails" style={{ margin: "10px 0" }}>
                            {Object.entries(categoryDetails).length > 0 ? (
                                <ul>
                                    {Object.entries(categoryDetails).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}</strong>: {value}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No extra details</p>
                            )}
                        </div>
                        <p className="product-price" id="productPrice"
                            style={{ fontSize: "1.3em", fontWeight: "bold", color: "#444" }}>Rs. {product.price}</p>
                    </div>
                </div>

                <div className="owner-info-container"
                    style={{ flex: 1, paddingLeft: "30px", borderLeft: "1px solid #eee", textAlign: "center" }}>
                    <h3 style={{ fontFamily: "'Comic Sans MS', cursive" }}>Owner Info</h3>
                    <div className="owner-image-box" style={{ margin: "15px 0" }}>
                        <img id="ownerPhoto" src={product.owner.profileImage ? `${STATIC_CONTENT_PATH}/media/images/${product.owner.profileImage}` : `/images/default-user.png`}
                            alt="Owner"
                            style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "2px solid #ccc" }} />
                    </div>
                    <p>
                        <strong>Name:</strong> <span id="ownerName">{product.owner.firstname} {product.owner.lastname}</span>
                    </p>
                    <p>
                        <strong>City:</strong> <span id="ownerCity">{product.owner.city}</span>
                    </p>
                    <div className="owner-actions" style={{ marginTop: "20px" }}>
                        <button id="showPhoneBtn" className="action-btn"
                            style={{ marginBottom: "10px" }}>Get Contact Number</button>
                        <p id="ownerPhone" style={{ display: "none", fontWeight: "bold" }}></p>
                        <button id="openChat" className="action-btn" onClick={() => openChat(product.owner.id,`${product.owner.firstname} ${product.owner.lastname}`)}>Chat with Owner</button>
                    </div>
                </div>

            </div>
        </div>);
}