const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

//for connect to database
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
//connecto to mongoose
mongoose
  .connect(
    "mongodb+srv://node-rest-shop:<password>@node-rest-shop-7wuet.mongodb.net/test?retryWrites=true&w=majority",
    { user: "node-rest-shop", pass: "zizi1371", useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Could not connect to MongoDB", err));

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handling CROS errors(client and server have different url,then so fixed promlem to allow client access server)
// app.use((req, rs, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Header",
//     "Origin, X-Requested-with, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access- Control-Allow-Methods",
//       "PUT, POST, PATCH, DELETE, GET"
//     );
//   }
//   next();
// });
app.use(cors());

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/order", orderRoutes);

//error handeling
app.use((req, res, next) => {
  const error = new Error("Not Found the page ore address");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
