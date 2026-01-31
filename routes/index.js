const Router = require("express").Router();

const MaincategoryRoute = require("./MaincategoryRoute");
const SubcategoryRoute = require("./SubcategoryRoute");
const BrandRoute = require("./BrandRoute");
const Testimonial = require("./TestimonialRoute");
const Product = require("./ProductRoute")

Router.use("/maincategory", MaincategoryRoute)
Router.use("/subcategory", SubcategoryRoute)
Router.use("/brand", BrandRoute)
Router.use("/testimonial", Testimonial);
Router.use("/product", Product);

module.exports = Router; 