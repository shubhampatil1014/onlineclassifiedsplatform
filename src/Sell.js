import { useEffect, useState } from "react";
import { getAllCategories } from "./api/Api";
import { Link } from "react-router-dom";

export default function Sell() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchAllCategories = async () => {
			const data = await getAllCategories();
			setCategories(data);
		}
		fetchAllCategories();
	},[]);

	return (
		<div className="main">

			<div className="banner">
				<div className="categories">
					{categories.length > 0 && categories.map((category) => (
						<div id="pro-categories" key={category.categoryId} className={category.categoryName} style={{float : "left"}}>
							<div>
								<Link to={`/addproduct/${category.categoryId}`}>
									<div className="categories-images">
										<img src={`images/${category.categoryName}.png`} alt={category.categoryName} />
									</div>
									<div className="categories-text">
										<span>{category.categoryName}s</span>
									</div>
								</Link>
							</div>
						</div>
					))}
					<div className="clear-both"></div>
				</div>

			</div>
		</div>
	);
}