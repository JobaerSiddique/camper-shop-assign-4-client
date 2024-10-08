🏕️ Campers Shop: E-commerce Website for Camping Enthusiasts
Welcome to Campers Shop, your one-stop-shop for the best camping gear! This README outlines the structure, functionality, and features of the frontend of the website.
🛠️ Project Overview
Campers Shop is an e-commerce platform offering camping gear to outdoor enthusiasts. The website is designed with the following key sections:

Homepage
Products Page
Product Details Page
Product Management
Cart Page
Checkout Page
About Us Page
UI/UX Enhancements
🌐 Live Demo
A live demo of the project can be accessed here: Campers Shop Demo

📜 Features
1. Homepage
Header: Contains the logo, site name, navigation links (e.g., About Us, Products Page), and essential icons (cart, wishlist).
Hero Section: A captivating, visually appealing banner to engage visitors.
Best Selling/Recommended Products Section: Highlights key products with a "View More" button linking to the Products page.
Categories Section: Displays product categories with images/icons.
Featured Products Section: Showcases key products with buttons to view their details.
Unique Section: Includes distinct content such as video blogs, testimonials, or featuring tour groups.
FAQ Section: Frequently asked questions about products, shipping, or other important details.
Footer: Displays contact information, social media links, and other relevant links.
2. Products Page
Product Listings: Displays all products in grid or list view.
Search & Filter: Includes a search bar, category filters, and price sorting.
Sorting Options: Users can sort by ascending/descending price.
Product Details Button: Redirects users to the product details page.
Clear Filters: Resets all search and filter options.
3. Product Details Page
Product Information: Displays product name, price, stock-quantity, description, category, ratings, and images.
Add to Cart: Prevents adding duplicate products; instead, the quantity increases (up to available stock). The button is disabled when stock is unavailable.
4. Product Management
Product List Table: Displays all products with columns for image, name, price, category, and actions (edit, delete).
Actions:
Add new products.
Modify product details.
Delete products with confirmation prompts.
5. Cart Page
Cart Items: Displays products added to the cart with their quantities.
Quantity Controls: Users can increase/decrease product quantities (from 1 to stock limit).
Remove Product: Prompts for confirmation before removing products from the cart.
Pricing Details: Dynamically updated total pricing as products are added/removed or quantities change.
Place Order Button: Redirects users to the Checkout page when activated.
6. Checkout Page
User Information Form: Collects name, email, phone number, and delivery address.
Payment Methods:
Cash on Delivery: Completes the order and deducts stock upon placing the order.
Stripe Integration (Optional): Redirects users to Stripe for payment.
7. About Us Page
Contact Information: Displays the company's phone number, email, and physical address.
Map: Embeds Google Map showing the shop's location.
Social Media Links: Icons linking to social media pages.
Mission Statement & Team Members: Showcases the company's mission and team.

🛠️ Tech Stack
Frontend:

React
Redux for State Management
Tailwind CSS for styling

SweetAlert2 for Modals
React Hook Form for form handling

LiveLink: https://camper-shop-44.netlify.app/