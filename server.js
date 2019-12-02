//const http = require("http");
const express = require("express");
const app = require("./app");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));






//const PORT = process.env.PORT || 5000;
//const server = http.createServer(app);
//server.listen(PORT);
