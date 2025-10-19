import { useState, useEffect } from "react";
import { addProduct, getBrands, getModels } from "./api/Api";
import { useParams } from "react-router-dom";

const categoryFields = {
  mobile: [
    { name: "brand", type: "dropdown", source: "brand" },
    { name: "model", type: "dropdown", source: "model" },
    { name: "year", type: "number", placeholder: "Year" },
  ],
  motorCycle: [
    { name: "brand", type: "dropdown", source: "brand" },
    { name: "model", type: "dropdown", source: "model" },
    { name: "year", type: "number", placeholder: "Year" },
    { name: "km", type: "number", placeholder: "Kilometers Driven" },
    {
      name: "fuelType",
      type: "dropdown",
      options: ["Petrol", "Diesel", "CNG", "Electric"],
    },
    {
      name: "no_of_owners",
      type: "dropdown",
      options: ["1st", "2nd", "3rd", "4th", "4+"],
    },
  ],
  car: [
    { name: "brand", type: "dropdown", source: "brand" },
    { name: "model", type: "dropdown", source: "model" },
    { name: "year", type: "number", placeholder: "Year" },
    {
      name: "fuelType",
      type: "dropdown",
      options: ["Petrol", "Diesel", "CNG", "Electric"],
    },
    {
      name: "transmission",
      type: "dropdown",
      options: ["Automatic", "Manual"],
    },
    { name: "km", type: "number", placeholder: "Kilometers Driven" },
    {
      name: "no_of_owners",
      type: "dropdown",
      options: ["1st", "2nd", "3rd", "4th", "4+"],
    },
  ],
};

// ✅ map numeric ID to category name
const categoryMap = {
  1: "car",
  2: "motorCycle",
  3: "mobile",
};

const AddProduct = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({});
  const { categoryId } = useParams();

  // Determine category key from ID or name
  const categoryKey = categoryMap[categoryId] || categoryId;

  // Fetch brands when category changes
  useEffect(() => {
    if (categoryId) {
      getBrands(categoryId)
        .then((res) => setBrands(res || []))
        .catch((err) => console.error("Failed to fetch brands:", err));
    }
  }, [categoryId]);

  // Fetch models when brand changes
  useEffect(() => {
    if (brand) {
      getModels(brand)
        .then((res) => setModels(res || []))
        .catch((err) => console.error("Failed to fetch models:", err));
    } else {
      setModels([]);
    }
  }, [brand]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("categoryId", categoryId);
    data.append("brandId", brand);
    data.append("modelId", model);

    // append other fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    const response = await addProduct(data);
    console.log("Response : ", response);
    alert("Product submitted ✅");
  };

  const fields = categoryFields[categoryKey] || [];

  // ✅ render dynamic input fields
  const renderField = (field) => {
    switch (field.type) {
      case "dropdown":
        if (field.source === "brand") {
          return (
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b.brandId} value={b.brandId}>
                  {b.brandName}
                </option>
              ))}
            </select>
          );
        }

        if (field.source === "model") {
          return (

            <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">Select Model</option>
              brand && (
              {models.map((m) => (
                <option key={m.modelId} value={m.modelId}>
                  {m.modelName}
                </option>
              ))}
              );
            </select>
          )

        }

        if (field.options) {
          return (
            <select
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
        break;

      case "number":
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <>
      <style>{`
        .add-product {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background: #f5f6fa;
  padding: 40px 0;
  font-family: "Poppins", sans-serif;
}

.add-product-form-container {
  background: #fff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 90%;
  max-width: 700px;
  transition: 0.3s;
}

.add-product-form-container:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.add-product label {
  font-weight: 600;
  color: #333;
  display: inline-block;
  margin-bottom: 6px;
}

.add-product table {
  width: 100%;
  border-collapse: collapse;
}

.add-product th {
  text-align: center;
  font-size: 1.4rem;
  color: #222;
  padding-bottom: 20px;
  letter-spacing: 0.5px;
}

.add-product td {
  padding: 12px 8px;
  vertical-align: middle;
}

.add-product input,
.add-product select,
.add-product textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 15px;
  color: #333;
  outline: none;
  transition: all 0.2s ease-in-out;
}

.add-product input:focus,
.add-product select:focus,
.add-product textarea:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}

.add-product textarea {
  resize: vertical;
  min-height: 90px;
}

.add-product button {
  background-color: #007bff;
  color: white;
  font-weight: 600;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 100%;
  letter-spacing: 0.5px;
}

.add-product button:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .add-product-form-container {
    padding: 25px 20px;
  }

  .add-product th {
    font-size: 1.2rem;
  }

  .add-product td {
    display: block;
    width: 100%;
  }

  .add-product td label {
    display: block;
    margin-bottom: 5px;
  }

  .add-product button {
    margin-top: 15px;
  }
}
  .image-preview-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  gap: 8px;
}

.image-preview {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 70px;
  height: 70px;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

`}
      </style>


      <div className="add-product">
        <div className="add-product-form-container">
          <form onSubmit={handleSubmit}>
            <table align="center">
              <thead>
                <tr>
                  <th colSpan="2">
                    <label>ADD PRODUCT</label>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamic category fields */}
                {fields.map((field) => (
                  <tr key={field.name}>
                    <td>
                      <label>
                        {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                      </label>
                    </td>
                    <td>{renderField(field)}</td>
                  </tr>
                ))}

                {/* Common Fields */}
                <tr>
                  <td>
                    <label>Title</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="title"
                      placeholder="Product Title"
                      value={formData.title || ""}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Description</label>
                  </td>
                  <td>
                    <textarea
                      name="description"
                      placeholder="Description"
                      value={formData.description || ""}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Price</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={formData.price || ""}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Images</label>
                  </td>
                  <td>
                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, images: e.target.files[0] }))
                      }
                    />

                    {formData.images && formData.images.length > 0 && (
                      <div className="image-preview-container">
                        {formData.images.map((img, index) => (
                          <div key={index} className="image-preview">
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`Preview ${index}`}
                              width="70"
                              height="70"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>


                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    <button type="submit">POST</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div></>
  );
};

export default AddProduct;
