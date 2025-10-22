import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './theme.css';
import './style.css';
import Header from './Header';
import Footer from './Footer';
import reportWebVitals from './reportWebVitals';
import Products from './Products';
import Product from './Product';   // <-- new details page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Favourites from './Favourites';
import Chats from './Chats';
import EditProfile from './EditProfile';
import AddProduct from './AddProduct';
import Sell from './Sell';
import MyPosts from './MyPosts';
import SearchResults from './SearchResults';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
			<Router>
				<div className="main-container">
					<Header />
					{/* Define routes here */}
					<Routes>
						<Route path="/" element={<Products />} />
						<Route path="/index" element={<Products />} />
						<Route path="/index/*" element={<Products />} />
						<Route path="/product/:productId" element={<Product />} />
						<Route path='/favourites' element={<Favourites />} />
						<Route path='/chats' element={<Chats />} />
						<Route path='/edit-profile' element={<EditProfile />} />
						<Route path='/addproduct/:categoryId' element={<AddProduct />} />
						<Route path='/sell' element={<Sell />} />
						<Route path='/myPosts' element={<MyPosts/>}/>
						<Route path='/search-results/:keyword' element={<SearchResults/>}/>
					</Routes>
					<Footer />
				</div>
				{/* 					Login Page 					*/}

				<div id="loginpage" className="login-page">
					<Login />
				</div>

				{/* 					Register Page 					*/}


				<div id="registerpage" className="register-page">
					<Register />
				</div>


				{/* 					Logout Page 					*/}

				<div id="logoutpage" className="form-page">
					<Logout />
				</div>
			</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
