# Trendify

Trendify is a multi-vendor e-commerce web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows vendors to showcase and sell their products online, while providing customers with a seamless shopping experience.

## Features

- **Multi-Vendor Support**: Vendors can register, set up their own store, and manage products.
- **Product Management**: Vendors can add, edit, and delete products, including details such as name, description, price, and images.
- **User Authentication**: Secure user authentication system for both vendors and customers.
- **Shopping Cart**: Customers can add products to their cart, view and modify the cart contents, and proceed to checkout.
- **Order Management**: Customers can view their order history, track orders, and update order status.
- **Search and Filtering**: Users can search for products and filter them based on various criteria such as category, price range, etc.
- **Responsive Design**: The application is designed to be mobile-friendly and responsive across different devices and screen sizes.

## Tech Stack

- **Frontend**: React.js, Redux (for state management), React Router (for routing)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Integration**: Stripe

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed locally or a MongoDB Atlas account (for cloud-hosted database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MazenAbdallaAbdelhadi/trendify.git
   ```

2. Navigate to the project directory:

   ```bash
   cd trendify
   ```

3. Install dependencies for both backend and frontend:

   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory and specify the following environment variables:

   ```
   PORT=5000
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

2. Replace `<your_mongodb_uri>` with the connection URI for your MongoDB database and `<your_jwt_secret>` with a secret key for JWT token generation.

### Running the Application

1. Start the backend server:

   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server:

   ```bash
   cd client
   npm run dev
   ```

3. The application will be accessible at `http://localhost:3000` by default.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

