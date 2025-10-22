// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware for JSON parsing
app.use(express.json());

// Logger middleware - logs every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Authentication middleware - protects POST, PUT, DELETE
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "Unauthorized: Invalid API key" });
  }
  next();
};

// Validation middleware - ensures required fields are present
const validateProduct = (req, res, next) => {
  const { name, price, category, inStock } = req.body;
  if (!name || price === undefined || !category || inStock === undefined) {
    return res.status(400).json({ message: "Missing required product fields" });
  }
  next();
};

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// GET /api/products - Get all products with optional filtering, search, and pagination
app.get('/api/products', (req, res) => {
  let result = products;

  // Filter by category
  if (req.query.category) {
    result = result.filter(p => p.category.toLowerCase() === req.query.category.toLowerCase());
  }

  // Search by name
  if (req.query.search) {
    result = result.filter(p => p.name.toLowerCase().includes(req.query.search.toLowerCase()));
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedResult = result.slice(start, end);

  res.json({
    total: result.length,
    page,
    limit,
    data: paginatedResult
  });
});

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// POST /api/products - Create a new product
app.post('/api/products', authenticate, validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', authenticate, validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', authenticate, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  products.splice(index, 1);
  res.status(204).send();
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;
