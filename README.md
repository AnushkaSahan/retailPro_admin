# RetailPro POS Frontend

> Modern, responsive Point of Sale web interface built with React 18, JavaScript and Material UI

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Material UI](https://img.shields.io/badge/MUI-5.0-007FFF?style=flat-square&logo=mui&logoColor=white)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

## Overview

RetailPro POS Frontend is a comprehensive web application designed for modern retail operations. Built with cutting-edge technologies, it provides an intuitive interface for cashiers and administrators to manage products, process sales, track inventory and analyze business performance in real-time.

### Key Highlights

- **Lightning Fast** — Powered by Vite for instant hot module replacement and optimized builds
- **Well-structured** — Modern JavaScript (ES2023) for clean, maintainable code
- **Responsive Design** — Beautiful UI that works seamlessly across desktop, tablet and mobile devices
- **Real-Time Analytics** — Interactive charts and dashboards for business insights
- **Role-Based Access** — Separate interfaces and permissions for admins and cashiers

## Technology Stack

```
Framework          │ React 18.2
Build Tool         │ Vite 5.0
Language           │ JavaScript (ES2023)
UI Library         │ Material UI (MUI) 5.0
HTTP Client        │ Axios
Routing            │ React Router v6
Charts             │ Chart.js with react-chartjs-2
State Management   │ React Context API
Form Handling      │ React Hook Form
Icons              │ Material Icons
Date Handling      │ date-fns
```

## Project Architecture

```
retailpro-pos-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   ├── dashboard/
│   │   │   ├── DashboardStats.jsx
│   │   │   └── SalesChart.jsx
│   │   ├── products/
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── sales/
│   │   │   ├── SalesList.jsx
│   │   │   ├── NewSale.jsx
│   │   │   ├── SaleCart.jsx
│   │   │   └── InvoiceView.jsx
│   │   ├── customers/
│   │   │   ├── CustomerList.jsx
│   │   │   └── CustomerForm.jsx
│   │   ├── categories/
│   │   │   ├── CategoryList.jsx
│   │   │   └── CategoryForm.jsx
│   │   ├── reports/
│   │   │   ├── DailySalesReport.jsx
│   │   │   ├── InventoryReport.jsx
│   │   │   └── TopSellingReport.jsx
│   │   └── auth/
│   │       └── LoginForm.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Sales.jsx
│   │   ├── Customers.jsx
│   │   ├── Categories.jsx
│   │   ├── Reports.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── saleService.js
│   │   ├── customerService.js
│   │   ├── categoryService.js
│   │   └── reportService.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── utils/
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Prerequisites

Ensure you have the following installed:

| Software | Version | Download |
|----------|---------|----------|
| **Node.js** | 18.0 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.0 or higher | Included with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd retailpro-pos-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:8080/api

# Application Settings
VITE_APP_NAME=RetailPro POS
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at: **`http://localhost:5173`** 🚀

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run type-check` | Run TypeScript compiler check |
| `npm run format` | Format code with Prettier |
| `npm test` | Run unit tests with Vitest |

## Features & Functionality

### 🔐 Authentication & Authorization

- Secure login with session management
- Role-based access control (Admin, Cashier)
- Automatic session timeout handling
- Protected routes for authenticated users
- Remember me functionality

### 📦 Product Management

- Complete CRUD operations for products
- Category-based organization
- Barcode scanning support
- Bulk product import/export
- Low stock alerts and notifications
- Product image upload and management
- Real-time inventory tracking

### 🛒 Sales & Billing

- Intuitive point-of-sale interface
- Quick product search with barcode/name
- Shopping cart with quantity management
- Multiple payment methods (Cash, Card, Mobile Payment)
- Automatic invoice generation
- Receipt printing functionality
- Sales history and tracking
- Customer association with sales

### 👥 Customer Management

- Customer database with full CRUD operations
- Contact information management
- Purchase history tracking
- Customer loyalty programs
- Quick customer search
- Export customer data

### 📊 Reports & Analytics

- **Dashboard Overview**
  - Today's sales summary
  - Revenue trends
  - Best-selling products
  - Inventory status
  - Low stock alerts

- **Sales Reports**
  - Daily/Weekly/Monthly sales analysis
  - Revenue by payment method
  - Cashier performance metrics
  - Sales by category

- **Inventory Reports**
  - Current stock levels
  - Product movement analysis
  - Reorder recommendations
  - Stock valuation

- **Interactive Charts**
  - Line charts for trends
  - Bar charts for comparisons
  - Pie charts for distribution
  - Real-time data updates

###⚙️ Additional Features

- **Dark/Light Theme** — Toggle between themes
- **Responsive Design** — Works on all screen sizes
- **Offline Support** — Basic functionality without internet
- **Export Data** — CSV/PDF export for reports
- **Multi-language Support** — (Coming soon)
- **Keyboard Shortcuts** — Faster navigation and operations

## Page Routes

| Route | Component | Description | Access Level |
|-------|-----------|-------------|--------------|
| `/` | Dashboard | Home page with stats and overview | Authenticated |
| `/login` | Login | User authentication page | Public |
| `/dashboard` | Dashboard | Main dashboard with analytics | Authenticated |
| `/products` | Products | Product management interface | Authenticated |
| `/products/new` | ProductForm | Add new product | Admin |
| `/products/:id` | ProductDetail | View/Edit product details | Authenticated |
| `/sales` | Sales | Point of sale interface | Authenticated |
| `/sales/history` | SalesHistory | Past sales records | Authenticated |
| `/sales/:id` | SaleDetail | View sale details | Authenticated |
| `/customers` | Customers | Customer management | Authenticated |
| `/customers/:id` | CustomerDetail | Customer profile | Authenticated |
| `/reports` | Reports | Analytics dashboard | Admin |
| `/reports/sales` | SalesReports | Detailed sales reports | Admin |
| `/reports/inventory` | InventoryReports | Stock reports | Admin |
| `/settings` | Settings | Application settings | Admin |
| `/profile` | Profile | User profile management | Authenticated |

## API Integration

### API Service Structure

```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error codes
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.warn('Unauthorized – please log in again.');
      } else if (status === 403) {
        console.warn('Forbidden – you do not have permission.');
      } else if (status >= 500) {
        console.error('Server error – please try again later.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

```

### Example API Calls

```javascript
// Get all products
const products = await productService.getAllProducts();

// Create a sale
const sale = await saleService.createSale({
  customerId: 1,
  paymentType: 'CASH',
  items: [
    { productId: 1, quantity: 2 }
  ]
});

// Get daily sales report
const report = await reportService.getDailySales();
```

## State Management

### Auth Context Example

```javascript
const { user, login, logout, isAuthenticated } = useAuth();

// Login
await login('username', 'password');

// Logout
logout();

// Check authentication
if (isAuthenticated) {
  // User is logged in
  console.log('Welcome,', user?.username || 'Guest');
} else {
  console.log('Please log in');
}
```

### Cart Context Example

```javascript
const { cart, addItem, removeItem, clearCart } = useCart();

// Add product to cart
addItem({ product, quantity: 2 });

// Remove product from cart
removeItem(product.id);

// Clear entire cart
clearCart();
```

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized build in the `/dist` directory with:
- Minified and bundled JavaScript
- Optimized CSS
- Compressed assets
- Source maps (optional)

### Preview Production Build

```bash
npm run preview
```

### Build Size Analysis

```bash
npm run build -- --mode analyze
```

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Deploy to Traditional Hosting

1. Run `npm run build`
2. Upload contents of `/dist` folder to your web server
3. Configure server to serve `index.html` for all routes (SPA routing)

### Docker Deployment

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Development Guidelines

### Code Style

- Follow React best practices
- Use functional components with hooks
- Write clean, modern JavaScript (ES2023)
- Follow ESLint and Prettier rules
- Write meaningful component names
- Keep components small and focused

### Component Structure

```typescript
import React from 'react';
import { Box, Button } from '@mui/material';

export const MyComponent = ({ title, onSubmit }) => {
  return (
    <Box>
      <h1>{title}</h1>
      <Button onClick={onSubmit}>Submit</Button>
    </Box>
  );
};
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Performance Optimization

- **Code Splitting** — Lazy load routes and components
- **Image Optimization** — Use WebP format and lazy loading
- **Bundle Size** — Tree-shaking and minification
- **Caching** — Service worker for offline support
- **Memoization** — React.memo and useMemo for expensive operations

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Change port in vite.config.ts
export default defineConfig({
  server: {
    port: 3000
  }
})
```

**API Connection Failed**
- Verify `VITE_API_URL` in `.env` file
- Ensure backend server is running
- Check CORS configuration on backend

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please ensure:
- Code follows project style guidelines
- All tests pass
- JavaScript writes are properly defined
- Components are documented

## Project Roadmap

- [x] Core POS functionality
- [x] Product management
- [x] Sales processing
- [x] Customer management
- [x] Reports and analytics
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Barcode scanner integration
- [ ] Receipt printer support
- [ ] Advanced reporting features
- [ ] Customer loyalty program
- [ ] Multi-store support

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For issues, questions or contributions:

- **Issues:** [GitHub Issues](https://github.com/yourusername/retailpro-pos-frontend/issues)
- **Documentation:** [Wiki](https://github.com/yourusername/retailpro-pos-frontend/wiki)
- **Email:** anushkasahan209@gmail.com

## Acknowledgments

- Material UI team for the excellent component library
- React team for the amazing framework
- Vite team for the blazing-fast build tool
- All contributors who helped improve this project

---

**Built with React & JavaScript** | **Developed by Anushka Sahan** | **© 2025 RetailPro**
