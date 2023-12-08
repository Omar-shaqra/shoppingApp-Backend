const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

var bodyParser = require("body-parser");
const ApiError = require("./utils/apiError");
const dbConnecion = require("./config/database");

dotenv.config({ path: "config.env" });

const app = express();
//test config

const cors = require("cors")
app.use(cors({
    origin: "*"
}));


//connect db
dbConnecion();
//middle ware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Roots Functiuons
const userRouter = require("./routes/userRoute");
const authroute = require("./routes/authRoutes");
const categoryRoute = require("./routes/categoryRoute");
const brandroute = require("./routes/brandRoutes");
const productroute = require("./routes/productRoutes");

const subcategoryroute = require("./routes/subcategoryRoutes");
const cartRoute = require("./routes/cartRoutes");

// In system folder
const billRoute = require("./routes/System/billRoutes");
const storeRoute = require("./routes/System/storeRoute");
const storehouseRoute = require("./routes/System/storehouseRoute");
const sellsRoute = require("./routes/System/sellsRoute");
const supplierRoutes = require("./routes/System/supplierRoutes");
const branchRoutes = require("./routes/System/branchRoutes");
const ownerRoute = require("./routes/System/ownerRoute");
const IngredientRoute = require("./routes/System/IngredientRoute");
const FactoryRoute = require("./routes/System/FactoryRoute");
const ClinicRoute = require("./routes/System/clinicRoute");

//APIs Services

app.use("/api/users", userRouter);
app.use("/api/auth", authroute);
app.use("/api/categories", categoryRoute);
app.use("/api/subcategories", subcategoryroute);
app.use("/api/brands", brandroute);
app.use("/api/products", productroute);
app.use("/api/carts", cartRoute);
app.use("/api/bills", billRoute);
app.use("/api/stores", storeRoute);
app.use("/api/storehouses", storehouseRoute);
app.use("/api/branch", branchRoutes);
app.use("/api/sells", sellsRoute);
app.use("/api/supplier", supplierRoutes);
app.use("/api/owner", ownerRoute);
app.use("/api/ingredients", IngredientRoute);
app.use("/api/factory", FactoryRoute);
app.use("/api/clinics", ClinicRoute);

app.use("/", (req, res) => {
  res.send("your server is run successfully");
});

//ERROR HANDLING
app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route :${req.originalUrl}`, 400));
});

// SERVER RUN
const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server start on ${port}`);
});
