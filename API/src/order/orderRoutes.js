//Cria instância do servidor Express e do Express Router.
const express = require("express");
const router = express.Router();

//Cria instância de "orderController.js" para interação.
const orderController = require("./orderController");

/*
 * CREATE
 */
//Endpoint para criar um novo pedido. 
router.post("/order", orderController.newOrder);

/*
 * READ
 */
//Endpoint para buscar todos os pedidos no banco. 
router.get("/order/list", orderController.listOrders);

//Endpoint para buscar pedido por Id.
router.get("/order/:orderId", orderController.findOrderById);

/*
 * UPDATE
 */
//Endpoint para buscar o pedido por Id e atualizá-lo. 
router.put("/order/:orderId", orderController.updateOrder);

/*
 * DELETE
 */
//Endpoint para buscar o pedido e seus itens através do Id do pedido e deletá-los.
router.delete("/order/:orderId", orderController.deleteOrder);

module.exports = router;
