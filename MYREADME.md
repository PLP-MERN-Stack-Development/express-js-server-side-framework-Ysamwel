# Express.js Product API

## 🚀 Overview
This project is a RESTful API built with **Express.js** that allows CRUD operations on a `products` resource.  
It includes features like authentication, validation, logging, error handling, filtering, pagination, and search.

---

## 📦 Features
- List all products (`GET /api/products`)
- Get a single product by ID (`GET /api/products/:id`)
- Create a new product (`POST /api/products`)
- Update an existing product (`PUT /api/products/:id`)
- Delete a product (`DELETE /api/products/:id`)
- Filter products by category
- Search products by name
- Pagination for listing products
- Request logging middleware
- Authentication via API key
- Validation middleware
- Global error handling

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- UUID (for unique product IDs)
- dotenv (for environment variables)

---

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git

2. Navigate into the project directory:
cd REPO_NAME

3. Install dependencies:
npm install

4. Create a .env file based on .env.example:
PORT=3000
API_KEY=your_api_key_here

🚀 Running the Server
node server.js
The server will run on http://localhost:3000

API Endpoints
Get all products
GET /api/products

Optional query parameters:

category – filter by category
search – search by product name
page – page number for pagination
limit – number of items per page

Get product by ID
GET /api/products/:id

Create a new product
POST /api/products

Headers:
x-api-key: YOUR_API_KEY
Content-Type: application/json

Body:
{
  "name": "Tablet",
  "description": "Android tablet",
  "price": 300,
  "category": "electronics",
  "inStock": true
}

Update a product
PUT /api/products/:id

Headers:
x-api-key: YOUR_API_KEY
Content-Type: application/json

Body: JSON with any fields to update.

Delete a product
DELETE /api/products/:id

Headers:
x-api-key: YOUR_API_KEY

⚡ Error Handling

400 – Bad Request (missing required fields)

401 – Unauthorized (invalid API key)

404 – Not Found (product does not exist)

500 – Internal Server Error

📜 License
This project is open-source and free to use.