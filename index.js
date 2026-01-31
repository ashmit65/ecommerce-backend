const express = require("express");
const dotenv = require("dotenv")
const Routes = require("./routes/index")

require("./db_connect")
const app = express();

app.use(express.json());
app.use("/api", Routes)
app.use(express.static("./public"))
app.use("/uploads", express.static("./public/uploads"))

dotenv.config()
const PORT = process.env.PORT || 8001
app.listen(PORT, ()=>console.log(`Server is running at ${PORT}`))