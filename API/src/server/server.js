const express = require("express");
const bodyParser = require("body-parser");

//Instância "orderRoutes.js" para interação.
const orderRoutes = require("../order/orderRoutes");

//Criação da aplicação Express.
const orderApp = express();

orderApp.use(bodyParser.json());

orderApp.use("/", orderRoutes);

orderApp.listen(3000, () => {
  console.log("Aplicação em execução em http://locahost:3000");
});
