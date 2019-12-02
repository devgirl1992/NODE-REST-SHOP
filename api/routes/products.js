const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ProductSchema = require("../models/productSchema");

router.get("/", (req, res, next) => {
  ProductSchema.find()
    .select("name price id")
    .exec()
    .then(data => {
      const response = {
        count: data.length,
        products: data.map(dt => {
          return {
            id: dt._id,
            name: dt.name,
            price: dt.price,
            req: {
              method: "get",
              url: "http://localhost:3000/products/" + dt._id
            }
            
          };
        })
      };
      if (data.length > 0) {
        res.status(200);
        res.json({ message: "all data from database", response });
      } else {
        res.status(500);
        res.send({ message: " data base is empty!" });
      }
      res.end();
    })
    .catch(err => {
      res.status(500);
      res.send({ message: "some thing went wrong" });
      res.end();
    });
});

router.post("/", (req, res, next) => {
  //useed mongoose schema models
  const product = new ProductSchema({
    productId: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(result => {
      res.status(200);
      res.send({ message: "new product is Added", newProduct: {
        id: result.productId,
        name: result.name,
        price: result.price,
        req: {
          req: "POST",
          url: "http://localhost:3000/products"+ result.productId
        }
      }});
      res.end();
    })
    .catch(err => {
      res.send({ message: "something wnet wrong to post a new product", Error: err });
      res.status(500);
      res.end();
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  ProductSchema.findById(id)
    .exec()
    .then(obj => {
      console.log("from database", obj);
      if (obj) {
        res.status(200);
        res.send({ message: "find a product from database", selectedObj: {
          name: obj.name,
          price: obj.price,
          id: obj.id,
          requested: {
            type: "get by Id",
            url: "http://localhoct:3000" + obj.id
          }
        } });
        res.end();
      } else {
        res.status(404);
        res.send({ message: "this Id not exist" });
        res.end();
      }
    })

    .catch(err => {
      res.status(500);
      res.send({ message: "wrong Id" });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateObject = req.body;
  ProductSchema.update({ _id: id }, { $set: updateObject })
  
    .exec()
    .then(result => {
      res.status(200);
      res.send({ msessage: "updated!", updateObject });
      res.end();
    })
    .catch(err => {
      res.status(400);
      res.send({ message: "problem!" });
      res.end();
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  ProductSchema.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200);
      res.send({ message: "deleted!" });
      res.end();
    })
    .catch(err => {
      res.status(500);
      res.send({ message: " problem!" });
      res.end();
    });
});


router.delete("/", (req, res, next) => {
  ProductSchema.deleteMany()
  .exec()
  .then(result => {
    res.status(200);
    res.send("database is empty");
    res.end()
  })
  .catch(err => {
    res.status(500);
    res.send({ message: " problem to delete data" });
    res.end();
  })
})

module.exports = router;
