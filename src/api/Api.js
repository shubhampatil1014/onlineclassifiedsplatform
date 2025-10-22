
//Live
// const API_BASE_URL = "https://online-classifieds-platform.onrender.com";

//Local
//const API_BASE_URL = "http://localhost:8080";

import { API_BASE_URL } from "../config";


export async function getSessionInfo() {
    const response = await fetch(`${API_BASE_URL}/session-info`, {
        method: "GET",
        credentials: "include", // ✅ send JSESSIONID cookie
    });
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const sessionInfo = await response.json();
    return sessionInfo;
}

export async function logout() {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include", // ✅ send JSESSIONID cookie
    });
    if (!response.ok) {
        throw new Error("Failed while logging out...");
    }
    return response;
}

export async function authenticateUser(userName, password, loginType) {
    const formData = new URLSearchParams();
    formData.append("username", userName);
    formData.append("password", password);
    formData.append("loginType", loginType);

    const response = await fetch(`${API_BASE_URL}/authenticate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
        credentials: "include", // ✅ important
    });
    if (!response.ok) {
        throw new Error("Failed to fetch authenticate");
    }
    const data = await response.json();
    return data;
}

export async function getAllProducts() {
    const response = await fetch(`${API_BASE_URL}/getAllProducts`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    return products;
}

export async function addToFavourites(id) {
    const params = new URLSearchParams();
    params.append("productId", id);

    const response = await fetch(`${API_BASE_URL}/addToFavourites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),  // ✅ same as jQuery data
        credentials: "include",   // ✅ send JSESSIONID cookie
    });
    if (!response.ok) {
        throw new Error("Failed to add to favourites");
    }
    const data = await response.text();
    return data;
}

export async function getAllCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    const categories = await response.json();
    return categories;
}

export async function getChats() {
    const response = await fetch(`${API_BASE_URL}/chats`, {
        method: "GET",
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Failed to fetch chats");
    }
    const chats = await response.json();
    return chats;
}

export async function getChatsByOwner(ownerId) {
    const response = await fetch(`${API_BASE_URL}/chats/messages/${ownerId}`, {
        method: "GET",
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Failed to fetch chats");
    }
    const chats = await response.json();
    return chats;
}

export async function getCustomerDetails(){
    const response = await fetch(`${API_BASE_URL}/getCustomerDetails`,{
        method : "GET",
        credentials : "include"
    });
    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }
    const profile = await response.json();
    return profile;
}

export async function getProductsByKeyword(keyword) {
    const response = await fetch(`${API_BASE_URL}/products/getProductsByKeyword/${keyword}`);
    if (!response.ok) {
        throw new Error("Failed to fetch products By Keyword");
    }
    const productsByKeyword = await response.json();
    console.log(productsByKeyword);
    return productsByKeyword;
}

export async function getLocations(location) {
    const response = await fetch(`${API_BASE_URL}/getLocations/${location}`);
    if (!response.ok) {
        throw new Error("Failed to fetch locations");
    }
    const locations = await response.json();
    return locations;
}

export async function getProductDetails(productId) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch locations");
    }
    const product = await response.json();
    return product;
}

export async function getFavProducts() {
    const response = await fetch(`${API_BASE_URL}/getFavProducts`, {
        method: "GET",
        credentials: "include", // ✅ send JSESSIONID cookie
    });
    if (!response.ok) {
        throw new Error("Failed to fetch favourite products");
    }
    const favProducts = await response.json();
    return favProducts;
}

export async function getProductsByLocation(locationFilter) {
    const response = await fetch(`${API_BASE_URL}/products/getProductsByLocation/${locationFilter}`, {
        method: "GET",
        credentials: "include", // ✅ send JSESSIONID cookie
    });
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    return products;
}

export async function getBrands(categoryId){
    const response = await fetch(`${API_BASE_URL}/brands/${categoryId}`,{
        method : "GET",
        credentials : "include"
    });
    if (!response.ok) {
        throw new Error("Failed to fetch brands");
    }
    const brands = await response.json();
    return brands;
}

export async function getModels(brand){
    const response = await fetch(`${API_BASE_URL}/models/${brand}`,{
        method : "GET",
        credentials : "include"
    });
    if (!response.ok) {
        throw new Error("Failed to fetch brands");
    }
    const models = await response.json();
    console.log(models);
    return models;
}

export async function uploadMedia(formData){
    const response = await fetch(`${API_BASE_URL}/media/upload`,{
        method : "POST",
        body : formData,
        credentials : "include"
    });
    return response.json(); 
}

export async function addProduct(data){
    const response = await fetch(`${API_BASE_URL}/products/add`,{
        method : "POST",
        body : data,
        credentials : "include"
    });
    return response.json(); 
}

export async function getPostDetails(){
    const response = await fetch(`${API_BASE_URL}/products/posts`,{
        method : "GET",
        credentials : "include"
    });
    console.log(response);
    return response.json();
}

export async function getProductsBySearch(keyword){
    const response = await fetch(`${API_BASE_URL}/products/getSearchedProducts/${keyword}`,{
        method : "GET",
        credentials : "include"
    })
    const data=response.json();
    console.log("searched :" ,data);
    return data;
}