const BASE_URL = "http://localhost:8080";

export async function getAllProducts(){
    const response = await fetch(`${BASE_URL}/getAllProducts`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    return products;
}

export async function getAllCateories(){
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    const categories = await response.json();
    return categories;
}

export async function getProductsByKeyword(keyword){
    const response = await fetch(`${BASE_URL}/products/getProductsByKeyword/${keyword}`);
    if (!response.ok) {
        throw new Error("Failed to fetch products By Keyword");
    }
    const productsByKeyword = await response.json();
    console.log(productsByKeyword);
    return productsByKeyword;
}

export async function getLocations(location){
    const response = await fetch(`${BASE_URL}/getLocations/${location}`);
    if (!response.ok) {
        throw new Error("Failed to fetch locations");
    }
    const locations = await response.json();
    return locations;
}

export async function getProductDetails(productId){
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch locations");
    }
    const product = await response.json();
    return product;
}