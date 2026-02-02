Pakages:
1. express
2. mongoose
3. dotenv
4. jsonwebtoken
5. bcryptjs
6. cors
7. nodemon

Redux: 
we will be making use of Redux to manage the state of Our application Since our Application includes various features like authentication, cart, checkout, and more. We need a way to centralize some of our state to make it accessible throughout the application. Redux allows us to store and manage these shared states in an easy way. To use Redux, we'll make use of Redux Toolkit, which simplifies the setup process and provides powerful tools like createSlice for managing state. 

Thunk Middleware: 
We'll also need to make API calls to our Node.js server to fetch the required data. For this, we'll use the Redux Thunk middleware, which will help us in handling asynchronous requests to the server.

axios: to make api calls to server

## Backend Tech Stack & Purpose:

### Packages:
1. **express** - Web framework for building RESTful APIs and handling HTTP requests/responses
2. **mongoose** - MongoDB object modeling tool for schema validation and database operations
3. **dotenv** - Environment variable management for storing sensitive credentials and configuration
4. **jsonwebtoken (JWT)** - Secure user authentication and authorization token generation/verification
5. **bcryptjs** - Password hashing and encryption for secure user credential storage
6. **cors** - Cross-Origin Resource Sharing middleware to enable frontend-backend communication
7. **multer** - Middleware for handling file uploads from the frontend (product images)
8. **cloudinary** - Cloud storage service for hosting and managing product images
9. **streamifier** - Stream conversion utility for uploading files to Cloudinary
10. **nodemon** - Development tool for automatic server restart on file changes

---

## Frontend Tech Stack & Purpose:

### State Management:
**Redux & Redux Toolkit** - Centralized state management for authentication, cart, checkout, orders, and products across the entire application

**Redux Thunk Middleware** - Handles asynchronous API calls to the backend server and manages async state updates

### Core Framework & Libraries:
**React** - Frontend UI library for building dynamic, interactive user interfaces
**Vite** - Fast build tool and development server for rapid development and optimized production builds
**React Router DOM** - Client-side routing for navigation between pages (home, products, cart, admin dashboard)
**Axios** - HTTP client for making API requests to the Node.js backend

### Styling & UI:
**Tailwind CSS** - Utility-first CSS framework for responsive design and quick styling
**PostCSS** - CSS processing tool that works with Tailwind for autoprefixing and optimizations
**Autoprefixer** - Adds vendor prefixes to CSS for cross-browser compatibility
**React Icons** - Icon library for UI components (navigation, sidebar, buttons)

### Payment & Notifications:
**PayPal (@paypal/react-paypal-js)** - Secure payment gateway integration for processing transactions
**Sonner** - Toast notification library for user feedback (success, error, info messages)

### Security & Quality:
**React (protected routes)** - Client-side route protection for admin-only pages
**ESLint** - Code quality and linting tool to maintain consistent code standards
**@vitejs/plugin-react** - Vite plugin for React Fast Refresh during development

---

## Database:
**MongoDB** - NoSQL database for storing users, products, orders, carts, and checkout information