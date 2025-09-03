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
					<Route path="/product/:productId" element={<Product />} />
				</Routes>
				<Footer />
			</div>
			{/* 					Login Page 					*/}

			<div id="loginpage" className="login-page">
				<Login />
			</div>

			{/* 					Register Page 					*/}


			<div id="registerpage" className="register-page">
				<Register/>
			</div>


			{/* 					Logout Page 					*/}

			<div id="logoutpage" className="form-page">
				<Logout/>
			</div>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
