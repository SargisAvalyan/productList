import axios from "axios";
import { useEffect, useState } from "react";
import "./style.scss"
const ProductBox = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    async function fetchProduct(id) {
      try {
        const result = await axios(`https://dummyjson.com/products`);
        setProducts(result.data.products)
        console.log(result.data.products[0].images)
      } catch (error) {
      }
    }
    fetchProduct();
  }, []);
    const handleCategoryCheck = category => {
      if (selectedCategory.includes(category)) {
        setSelectedCategory(selectedCategory.filter(c => c !== category));
      } else {
        setSelectedCategory([...selectedCategory, category]);
      }
    };
   const categoryes = products.reduce((acc, current) => {
    const x = acc.find(item => item.category === current.category);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  return (<div className="ProdContainer">
    <div className="filters">
      <span style={{ borderBottom: "1.5px solid black", fontWeight: "bold" }}>Filter By Category</span>
      {categoryes.map(product => (
        <span className="categoryInfo" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }} key={product.id}>
          <p style={{ display: "flex", justifyContent: "space-evenly" }}>{product.category}</p>
          <label>
              <input type="checkbox" checked={selectedCategory.includes(product.category)} onChange={() => handleCategoryCheck(product.category)} />
            </label>
        </span>
      ))}
    </div>
    <div className="ProdList">
    {products.filter(product => selectedCategory.includes(product.category) || selectedCategory.length === 0).map(product => (
        <div key={product.id} className="productBox">

          <div className="productImage" style={{
            backgroundImage: `url("${product.thumbnail}")`
          }}></div>
          <p className="title">{product.title}
          </p>
          <p className="description"> {product.description}</p>
          <p className="price">Price {product.price}$</p>
        </div>))}
    </div>
  </div>

  );
};



export default ProductBox;
