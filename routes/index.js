const Router = require("express").Router();

const MaincategoryRoute = require("./MaincategoryRoute");
const SubcategoryRoute = require("./SubcategoryRoute");
const BrandRoute = require("./BrandRoute");
const TestimonialRoute = require("./TestimonialRoute");
const ProductRoute = require("./ProductRoute")
const UserRoute = require("./UserRoute")

Router.use("/maincategory", MaincategoryRoute)
Router.use("/subcategory", SubcategoryRoute)
Router.use("/brand", BrandRoute)
Router.use("/testimonial", TestimonialRoute);
Router.use("/product", ProductRoute);
Router.use("/user", UserRoute);

module.exports = Router; 