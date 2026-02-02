# 👗 Fashion E-Commerce Platform

A **MERN stack** application for an online fashion store with **secure authentication, product management, shopping cart, and PayPal payment integration**.  
It features **Redux state management**, **JWT-based authentication**, **Cloudinary cloud storage** for product images, and a **complete admin dashboard** for managing products, users, and orders.

---

## 🚀 Features

- 🔐 **User Authentication & Authorization**: Secure registration & login with JWT tokens and bcryptjs password hashing
- 👥 **User Profiles**: Manage personal information, view order history, and track deliveries
- 🛍️ **Product Catalog**: Browse, filter, search, and sort products by category, price, and gender
- 🛒 **Shopping Cart**: Add/remove items, update quantities, persistent cart management
- 💳 **Secure Checkout**: Multi-step checkout process with shipping address validation
- 💰 **PayPal Integration**: Secure payment processing with PayPal gateway
- 📦 **Order Management**: Track orders in real-time, view order history, and order details
- 🎯 **Newsletter Subscription**: Email subscription feature for promotions and updates
- 📊 **Admin Dashboard**: 
  - Complete product management (CRUD operations)
  - User management and monitoring
  - Order tracking and fulfillment
  - Real-time order status updates
- ☁️ **Cloud Storage (Cloudinary)**: Secure storage and fast delivery of product images
- 🎨 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Real-time Notifications**: Toast notifications for user actions (success, error, info)

---

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- Redux Toolkit (centralized state management)
- React Router DOM (client-side routing)
- Tailwind CSS (responsive UI)
- React Icons (icon library)
- Axios (HTTP client)
- PayPal React SDK
- Sonner & React-Toastify (notifications)

### Backend
- Node.js + Express
- MongoDB (Atlas)
- Mongoose (ODM)
- JWT (authentication)
- bcryptjs (password hashing)
- Cloudinary (image storage)
- Multer (file uploads)
- CORS (cross-origin requests)

<img width="1919" height="874" alt="Screenshot 2026-02-02 201616" src="https://github.com/user-attachments/assets/7c2d25c6-8cf5-46e5-a7d7-d13fe6ff4f61" />
<img width="1916" height="867" alt="Screenshot 2026-02-02 201647" src="https://github.com/user-attachments/assets/afdc3c25-b310-4809-8046-19b91e4c7d37" />
<img width="1919" height="870" alt="Screenshot 2026-02-02 201702" src="https://github.com/user-attachments/assets/7cd190f0-7779-46df-a1dd-280af035712f" />
<img width="1918" height="868" alt="Screenshot 2026-02-02 201723" src="https://github.com/user-attachments/assets/fadffd5f-c56d-4957-95da-97d40e5e1745" />
<img width="1919" height="930" alt="Screenshot 2026-02-02 201930" src="https://github.com/user-attachments/assets/d6ddb396-a408-41b3-9e45-9324f485f75a" />
<img width="1919" height="873" alt="Screenshot 2026-02-02 201938" src="https://github.com/user-attachments/assets/dc92acda-8926-4375-9817-c9529040c858" />
<img width="1919" height="872" alt="Screenshot 2026-02-02 201950" src="https://github.com/user-attachments/assets/3279ac50-68d8-4978-8f2a-487a7ae9b366" />
<img width="1919" height="869" alt="Screenshot 2026-02-02 202041" src="https://github.com/user-attachments/assets/503e91e9-7610-4660-be3c-a573e54701a9" />
<img width="1919" height="867" alt="Screenshot 2026-02-02 202056" src="https://github.com/user-attachments/assets/30bac715-54a5-46c5-9c7c-0d8433b2e9dd" />
<img width="1919" height="867" alt="Screenshot 2026-02-02 202105" src="https://github.com/user-attachments/assets/e2271c95-b2d3-4323-a527-7763bbfcff7e" />
<img width="1919" height="873" alt="Screenshot 2026-02-02 202115" src="https://github.com/user-attachments/assets/d7a17a8a-feaa-4417-9729-2e3da8770c97" />
<img width="1919" height="871" alt="Screenshot 2026-02-02 202124" src="https://github.com/user-attachments/assets/ae8afaba-c1a8-4b91-8c19-84bd017e9b6c" />

---

## 📂 Project Structure

```bash
fashion-ecommerce/
│
├── frontend/ # React frontend (Vite)
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── CollectionPage.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── Profile.jsx
│ │ │ ├── MyOrdersPage.jsx
│ │ │ ├── OrderDetailsPage.jsx
│ │ │ ├── OrderConfirmationPage.jsx
│ │ │ └── AdminHomePage.jsx
│ │ ├── components/
│ │ │ ├── Common/
│ │ │ │ ├── Header.jsx
│ │ │ │ ├── Navbar.jsx
│ │ │ │ ├── Footer.jsx
│ │ │ │ ├── ProtectedRoute.jsx
│ │ │ │ └── Searchbar.jsx
│ │ │ ├── Products/
│ │ │ │ ├── ProductGrid.jsx
│ │ │ │ ├── ProductDetails.jsx
│ │ │ │ ├── FilterSidebar.jsx
│ │ │ │ ├── SortOptions.jsx
│ │ │ │ └── FeaturedCollection.jsx
│ │ │ ├── Cart/
│ │ │ │ ├── CartContent.jsx
│ │ │ │ ├── Checkout.jsx
│ │ │ │ └── PayPalButton.jsx
│ │ │ ├── Admin/
│ │ │ │ ├── AdminLayout.jsx
│ │ │ │ ├── ProductManagement.jsx
│ │ │ │ ├── UserManagement.jsx
│ │ │ │ ├── OrderManagement.jsx
│ │ │ │ └── EditProductPage.jsx
│ │ │ └── Layout/
│ │ │ ├── Hero.jsx
│ │ │ ├── CartDrawer.jsx
│ │ │ └── UserLayout.jsx
│ │ ├── redux/
│ │ │ ├── store.js
│ │ │ └── Slices/
│ │ │ ├── authSlice.js
│ │ │ ├── cartSlice.js
│ │ │ ├── checkoutSlice.js
│ │ │ ├── orderSlice.js
│ │ │ ├── productsSlice.js
│ │ │ ├── adminSlice.js
│ │ │ ├── adminProductSlice.js
│ │ │ └── adminOrderSlice.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── .env
│ ├── vite.config.js
│ ├── tailwind.config.js
│ └── package.json
│
├── backend/ # Express backend
│ ├── models/
│ │ ├── user.js
│ │ ├── Product.js
│ │ ├── Cart.js
│ │ ├── Checkout.js
│ │ ├── Order.js
│ │ ├── Subscriber.js
│ │ └── Log.js
│ ├── routes/
│ │ ├── userRoutes.js
│ │ ├── ProductRoutes.js
│ │ ├── CartRoutes.js
│ │ ├── CheckoutRoutes.js
│ │ ├── orderRoutes.js
│ │ ├── uploadRoutes.js
│ │ ├── SubscribeRoute.js
│ │ ├── adminRoutes.js
│ │ ├── ProductAdminRoutes.js
│ │ └── AdminOrderRoutes.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── config/
│ │ └── db.js
│ ├── data/
│ │ └── products.js
│ ├── server.js
│ ├── seeder.js
│ ├── .env
│ └── package.json
│
├── README.md
└── .env # Environment variables (ignored)

## ⚙️ Setup Instructions

### 🔑 Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account
- Cloudinary account (free tier is enough)
- PayPal Developer account
- Git

### 🔧 Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/im-akash-prajapati-1/Obsidian---an-ecommerce-Clothing-website
   cd Obsidian---an-ecommerce-Clothing-website
   
2. **Setup backend**
   ```bash
   cd backend
   npm install
   ```
   **Create .env in server/:**
   ```bash
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    CLIENT_ORIGIN=http://localhost:5173
    PAYPAL_CLIENT_ID=your_paypal_client_id
   ```
  **Seed database**
   ```bash
   node seeder.js
   ```
   **Start server:**
   ```bash
   npm run dev
   ```
3. **Setup frontend**
   ```bash
   cd frontend
   npm install
   ```
   **Create .env in client/:**
   ```bash
   VITE_API_URL=http://localhost:5000/api
   VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
   ```
   **Start frontend:**
   ```bash
   npm run dev
   ```
🚀 Access the Application
Frontend: http://localhost:5173
Backend API: http://localhost:5000/api

### **📊 Key Features Explained**

Authentication Flow:
- Users register with email and password
- Passwords hashed with bcryptjs
- JWT tokens issued upon login
- Protected routes for authenticated users and admins

Shopping Experience
- Browse products with advanced filters (category, price, gender, size, color)
- Add items to cart with selected variants (size, color)
- Persistent cart storage
- One-click checkout with PayPal payment

Admin Dashboard
- Add/edit/delete products with image uploads to Cloudinary
- View all users and their details
- Manage orders (update status, mark as delivered)
- Real-time order tracking

State Management (Redux)
- authSlice: Login, registration, user info
- cartSlice: Add/remove items, manage quantities
- productsSlice: Fetch and filter products
- orderSlice: Manage user orders
- adminSlice: Admin-related state for dashboard operations

### **🔒 Security Features**

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API endpoints with middleware
- CORS configuration for cross-origin requests
- Environment variables for sensitive data (never commit .env)
- Admin-only routes on frontend and backend
- Cloudinary secure image storage

### **🔐 Security Notes**

- .env files are ignored in Git
- Never commit sensitive credentials to the repository
- Rotate MongoDB/Cloudinary/PayPal secrets if .env was exposed
- Validate and sanitize all user inputs on both frontend and backend
- Keep dependencies updated for security patches

### **📈 Future Enhancements**

- Email notifications for order updates
- User reviews and ratings
- Wishlist feature
- Advanced analytics dashboard for admins
- Multi-language support
- Social login (Google, Facebook)
- Mobile app with React Native
- Inventory alerts and stock management
