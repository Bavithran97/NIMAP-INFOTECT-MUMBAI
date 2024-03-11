import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

axios.defaults.baseURL = 'http://localhost:5000';
const App = () => {
  // State for categories
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  // State for products
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategoryId, setNewProductCategoryId] = useState('');

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories and products on initial render
  useEffect(() => {
    axios.get('/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
    
    fetchProducts();
  }, []);

  // Fetch products based on pagination
  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize]);

  // Function to fetch products
  const fetchProducts = () => {
    axios.get(`/api/products?page=${currentPage}&pageSize=${pageSize}`)
      .then(res => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error(err));
  };

  // Add a new category
  const addCategory = () => {
    axios.post('/api/categories', { categoryName: newCategoryName })
      .then(res => {
        setCategories([...categories, { CategoryId: res.data.id, CategoryName: newCategoryName }]);
        setNewCategoryName('');
        alert('Category added successfully!');
      })
      .catch(err => console.error(err));
  };

  // Add a new product
  const addProduct = () => {
    axios.post('/api/products', { ProductName: newProductName, CategoryId: newProductCategoryId })
      .then(res => {
        setProducts([...products, { ProductId: res.data.id, ProductName: newProductName, CategoryId: newProductCategoryId }]);
        setNewProductName('');
        setNewProductCategoryId('');
      })
      .catch(err => console.error(err));
  };

  // Function to handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <div className="container">
        <header>
          <h1>Product Management System</h1>
        </header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </nav>
        <Routes>
          {/* Route for Home */}
          <Route path="/" element={<Home />} />

          {/* Route for Categories */}
          <Route path="/categories" element={<Categories categories={categories} newCategoryName={newCategoryName} setNewCategoryName={setNewCategoryName} addCategory={addCategory} />} />

          {/* Route for Products */}
          <Route path="/products" element={<Products products={products} categories={categories} newProductName={newProductName} newProductCategoryId={newProductCategoryId} setNewProductName={setNewProductName} setNewProductCategoryId={setNewProductCategoryId} addProduct={addProduct} currentPage={currentPage} pageSize={pageSize} totalPages={totalPages} handlePageChange={handlePageChange} />} />
        </Routes>
        <footer>
          <p>&copy; 2024 Product Management System</p>
        </footer>
      </div>
    </Router>
  );
};

// Home component
const Home = () => (
  <div>
    <h2>Welcome to Product Management System</h2>
  </div>
);

// Categories component
const Categories = ({ categories, newCategoryName, setNewCategoryName, addCategory }) => (
  <div>
    <h2>Categories</h2>
    <ul>
      {categories.map(category => (
        <li key={category.CategoryId}>{category.CategoryName}</li>
      ))}
    </ul>
    <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
    <button onClick={addCategory}>Add Category</button>
  </div>
);

// Products component
const Products = ({ products, categories, newProductName, newProductCategoryId, setNewProductName, setNewProductCategoryId, addProduct, currentPage, pageSize, totalPages, handlePageChange }) => (
  <div>
    <h2>Products</h2>
    <ul>
      {products.map(product => (
        <li key={product.ProductId}>{product.ProductName} - {categories.find(cat => cat.CategoryId === product.CategoryId)?.CategoryName}</li>
      ))}
    </ul>
    <input type="text" value={newProductName} onChange={e => setNewProductName(e.target.value)} placeholder="Product Name" />
    <select value={newProductCategoryId} onChange={e => setNewProductCategoryId(e.target.value)}>
      <option value="">Select Category</option>
      {categories.map(category => (
        <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
      ))}
    </select>
    <button onClick={addProduct}>Add Product</button>
    {/* Pagination */}
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>{i + 1}</button>
      ))}
    </div>
  </div>
);

export default App;
