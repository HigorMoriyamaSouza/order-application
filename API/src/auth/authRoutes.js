//Cria instância do servidor Express e do Express Router.
const express = require("express");
const router = express.Router();

//Cria instância de "authController.js" para interação.
const authController = require("./authController");

/*
 * LOGIN
 */
//Endpoint para realizar login. 
router.post("/login", authController.login);

module.exports = router;