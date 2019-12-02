const axios = require("axios");

let potter = {
  name: "harry potter2",
  price: 15.50
};

/*axios
  .post("http://localhost:3000/products", potter)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
*/



  axios
     .get("http://localhost:3000/product")
        .then(res =>{console.log("it's worked")})
        .catch(err => {console.log("is wrong")});







     


