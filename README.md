# E-Commerce Backend API

A robust RESTful API backend for an e-commerce application built with Node.js, Express, and MongoDB. This backend provides complete CRUD operations for managing products, categories, brands, and testimonials with file upload capabilities.

## 🚀 Features

- **Complete CRUD Operations** for all entities
- **File Upload Management** for images (brands, products, testimonials)
- **MongoDB Integration** with Mongoose ODM
- **RESTful API Design** following industry standards
- **Error Handling** with descriptive error messages
- **Environment Configuration** for secure deployment
- **File System Cleanup** - automatically removes unused image files

## 🛠️ Technologies Used

### Core Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool

### Key Dependencies
- `dotenv` - Environment variable management
- `multer` - File upload handling
- `nodemon` - Development server with auto-restart

## 📁 Project Structure

```
server/
├── controllers/          # Request handlers
│   ├── BrandController.js
│   ├── MaincategoryController.js
│   ├── ProductController.js
│   ├── SubcategoryController.js
│   └── TestimonialController.js
├── middleware/           # Custom middleware
│   └── fileUploader.js   # File upload configuration
├── models/              # Database schemas
│   ├── Brand.js
│   ├── Maincategory.js
│   ├── Product.js
│   ├── Subcategory.js
│   └── Testimonial.js
├── public/              # Static files and uploads
│   └── uploads/
├── routes/              # API route definitions
│   ├── BrandRoute.js
│   ├── MaincategoryRoute.js
│   ├── ProductRoute.js
│   ├── SubcategoryRoute.js
│   ├── TestimonialRoute.js
│   └── index.js
├── .env                 # Environment variables
├── db_connect.js        # Database connection
├── index.js             # Application entry point
├── package.json         # Project dependencies
└── README.md            # This file
```

## 🎯 API Endpoints

### Main Category
```
GET    /api/maincategory          # Get all main categories
POST   /api/maincategory          # Create new main category
GET    /api/maincategory/:_id     # Get single main category
PUT    /api/maincategory/:_id     # Update main category
DELETE /api/maincategory/:_id     # Delete main category
```

### Sub Category
```
GET    /api/subcategory           # Get all sub categories
POST   /api/subcategory           # Create new sub category
GET    /api/subcategory/:_id      # Get single sub category
PUT    /api/subcategory/:_id      # Update sub category
DELETE /api/subcategory/:_id      # Delete sub category
```

### Brand
```
GET    /api/brand                 # Get all brands
POST   /api/brand                 # Create new brand (requires image)
GET    /api/brand/:_id            # Get single brand
PUT    /api/brand/:_id            # Update brand
DELETE /api/brand/:_id            # Delete brand (removes image file)
```

### Product
```
GET    /api/product               # Get all products
POST   /api/product               # Create new product
GET    /api/product/:_id          # Get single product
PUT    /api/product/:_id          # Update product
DELETE /api/product/:_id          # Delete product (removes image files)
```

### Testimonial
```
GET    /api/testimonial           # Get all testimonials
POST   /api/testimonial           # Create new testimonial
GET    /api/testimonial/:_id      # Get single testimonial
PUT    /api/testimonial/:_id      # Update testimonial
DELETE /api/testimonial/:_id      # Delete testimonial (removes image file)
```

## 📦 Data Models

### Brand
```javascript
{
  name: String,        // Required, unique
  pic: String,         // Required (image path)
  active: Boolean      // Default: true
}
```

### Product
```javascript
{
  name: String,                // Required
  maincategory: ObjectId,      // Required (reference)
  subcategory: ObjectId,       // Required (reference)
  brand: ObjectId,             // Required (reference)
  color: String,               // Required
  size: String,                // Required
  basePrice: Number,           // Required
  discount: Number,            // Required
  finalPrice: Number,          // Required
  stock: Boolean,              // Default: true
  stockQuantity: Number,       // Required
  description: String,         // Optional
  pic: [String],               // Array of image paths
  active: Boolean              // Default: true
}
```

### Main Category & Sub Category
```javascript
{
  name: String,        // Required, unique
  active: Boolean      // Default: true
}
```

### Testimonial
```javascript
{
  name: String,        // Required
  message: String,     // Required
  pic: String,         // Required (image path)
  active: Boolean      // Default: true
}
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env` file with your configuration

4. **Start the development server**
   ```bash
   npm run dev
   # or
   nodemon index.js
   ```

5. **Production build**
   ```bash
   node index.js
   ```

## 📤 File Upload Configuration

The application uses `multer` for handling file uploads:

- **Brand images**: `/public/uploads/brands/`
- **Product images**: `/public/uploads/products/`
- **Testimonial images**: `/public/uploads/testimonials/`

File names are automatically generated using timestamp + fieldname + extension.

## 🔧 Middleware

### File Upload Middleware
Custom file upload handlers are configured in `middleware/fileUploader.js`:
- `brandUploder` - For brand images
- `productUploder` - For product images
- `testimonialUploder` - For testimonial images

### CORS & Static Files
- CORS is enabled for all routes
- Static files served from `/public` directory
- Uploads accessible via `/uploads` endpoint

## 🛡️ Error Handling

The API includes comprehensive error handling:
- **Validation errors** with descriptive messages
- **Database errors** with proper HTTP status codes
- **File operation errors** with graceful fallbacks
- **404 responses** for invalid IDs

## 🧪 Testing

### Using Postman or curl

**Create a new brand:**
```bash
curl -X POST http://localhost:8000/api/brand \
  -F "name=Brand Name" \
  -F "pic=@/path/to/image.jpg"
```

**Get all products:**
```bash
curl http://localhost:8000/api/product
```

**Update a product:**
```bash
curl -X PUT http://localhost:8000/api/product/:id \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Product Name"}'
```

## 📊 Database Design

### Relationships
- **Products** reference **Main Categories**, **Sub Categories**, and **Brands**
- **Sub Categories** reference **Main Categories**
- All relationships use MongoDB ObjectId references

### Indexes
- Unique indexes on `name` fields where required
- Efficient querying through proper schema design

## 🔒 Security Considerations

- Environment variables for sensitive data
- File type validation in upload middleware
- Input validation through Mongoose schemas
- Proper error message sanitization

## 🚧 Future Enhancements

- User authentication and authorization
- Order management system
- Payment integration
- Search and filtering capabilities
- Caching layer implementation
- API rate limiting
- Comprehensive test suite

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support, email asmit.fullstack@gmail.com or create an issue in the repository.

---

**Built with ❤️ using Node.js, Express, and MongoDB**
