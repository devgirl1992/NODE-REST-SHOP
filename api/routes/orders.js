const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ProductSchema = require("../models/productSchema");

const OrderSchema = require("../models/orderSchema");

router.get("/", (req, res, next) => {
  OrderSchema.find()
    .exec()
    .then(result => {
      res.status(200);
      res.send({message: "here is all orders files",  
      OrderCount: result.length,
      AllOrdersDetails: result
      });
      res.end();
    })
    .catch(err => {
      res.status(500);
      res.send({ message: "problem!!!" });
      res.end();
    });
});

router.post("/", (req, res, next) => {
  ProductSchema.findById(req.body.productbind)
  .then(product => {
    if(!product) {
      res.status(400);
      res.send({message: "product not found"});
      res.end();
    }
    const Order = new OrderSchema({
      orderId: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      productbind: req.body.productbind
    });
    Order
    .save()
      .then(result => {
        res.status(201);
        res.send({ message: "added new order", OrderDetails: {
          quantity: result.quantity,
          orderId:result.orderId,
          productbind:result.productbind
        } });
        res.end();
      })
  })
  .catch(err => {
    res.status(500);
    res.send({ message: "some problem in order process" });
  })
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  OrderSchema.findById(id)
    .exec()
    .then(result=> {
      res.status(200)
      res.send({message: "here is the order details", orderDtails: result})
      res.end()
    })
    .catch(err => {
      res.status(500);
      res.send({ message: "wrong Id" });
    });
});

router.delete("/:orderId", (req, res, next) => {
  const id = req.params.productId;
  OrderSchema.deleteOne(id)
    .exec()
    .then(result => {
      res.status(200);
      res.send({ message: "order deleted" });
      res.end();
    })
    .catch(err => {
      res.status(500);
      res.send({ message: " problem!" });
      res.end();
    });
});

module.exports = router;
