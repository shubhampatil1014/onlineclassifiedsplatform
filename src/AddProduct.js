import { useState, useEffect } from "react";
import { getBrands, getModels } from "./api/Api"; // <-- your backend APIs
import { useParams } from "react-router-dom";


const categoryFields = {
  mobile: [
    { name: "brand", type: "dropdown", source: "brand" },
    { name: "model", type: "dropdown", source: "model" },
    { name: "year", type: "number", placeholder: "Year" }
  ],
  motorCycle: [
    { name: "brand", type: "dropdown", source: "brand" },
    { name: "model", type: "dropdown", source: "model" },
    { name: "year", type: "number", placeholder: "Year" },
    { name: "km", type: "number", placeholder: "Kilometers Driven" }
  ],
  car: [
    { name: "brand", type: "dropdown", source: "brand" },
    { name: "model", type: "dropdown", source: "model" },
    { name: "year", type: "number", placeholder: "Year" },
    { name: "fuelType", type: "dropdown", options: ["Petrol", "Diesel", "CNG", "Electric"] },
    { name: "transmission", type: "text", placeholder: "Transmission" },
    { name: "km", type: "number", placeholder: "Kilometers Driven" },
    { name: "no_of_owners", type: "number", placeholder: "Number of Owners" }
  ]
};


const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: ""
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const { categoryId } = useParams();

  // Fetch brands when category changes
  useEffect(() => {
    if (categoryId) {
      getBrands(categoryId).then(setBrands);
    }
  }, [categoryId]);

  // Fetch models when brand changes
  useEffect(() => {
    if (formData.brand) {
      getModels(formData.brand).then(setModels);
    }
  }, [formData.brand, category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      category,
      ...formData
    };
    console.log("Submitted Product:", payload);
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Common Fields */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Category Selector */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="mobile">Mobile</option>
          <option value="motorCycle">Motorcycle</option>
          <option value="car">Car</option>
        </select>

        {/* Dynamic Fields */}
        {category &&
          categoryFields[category]?.map((field) => {
            if (field.type === "dropdown" && field.source === "brand") {
              return (
                <select
                  key={field.name}
                  name="brand"
                  value={formData.brand || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Brand</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              );
            }
            if (field.type === "dropdown" && field.source === "model") {
              return (
                <select
                  key={field.name}
                  name="model"
                  value={formData.model || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Model</option>
                  {models.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              );
            }
            if (field.type === "dropdown" && field.options) {
              return (
                <select
                  key={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                >
                  <option value="">Select {field.name}</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              );
            }
            return (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            );
          })}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
