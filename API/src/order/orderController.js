//Instância databaseConnection para realizar interações com o banco de dados.
const databaseConnection = require("../database/databaseConnection");

/*
 * CREATE
 */
exports.newOrder = (request, response) => {

  //Destructuring do body da request pegando as informações do novo pedido.
  const { numeroPedido, valorTotal, dataCriacao, items } = request.body;

  //Transformando dados do pedido para save em banco.
  const order = {
    orderId: numeroPedido,
    value: valorTotal,
    creationDate: new Date(dataCriacao),
  };

  //Criando a SQL query e realizando save de "order" no banco de dados.
  databaseConnection.query("INSERT INTO orders SET ?", order, (error) => {

    //Em caso de erro retorna HTTP status: 500 - Internal Server Error.
    if (error) {
      return response.status(500).json(error);
    }

    //Itera "items" já realizando save de cada item no banco.
    items.forEach((item) => {

      //Transformando dados de item para save em banco.
      const newItem = {
        orderId: numeroPedido,
        productId: parseInt(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem,
      };

      //Criando a SQL query e realizando save de "item" no banco de dados.
      databaseConnection.query("INSERT INTO items SET ?", newItem);

    });

    //Retorna HTTP status: 200 - OK Status Code.
    response.status(200).json({ message: "O pedido foi criado com sucesso!" });

  });
};

/*
 * READ ALL
 */
exports.listOrders = (request, response) => {

  //Criando a SQL query e realizando busca de todas as "orders".
  databaseConnection.query("SELECT * FROM orders", (error, orderResults) => {

    //Em caso de erro retorna HTTP status: 500 - Internal Server Error.
    if (error) {
      return response.status(500).json(error);
    }

     //Retorna HTTP status: 200 - OK Status Code, mais ordens.
    response.status(200).json(orderResults);

  });

}

/*
 * READ BY ID
 */
exports.findOrderById = (request, response) => {

  //Extrai id dos parâmetros da request e salva em "orderId"
  const orderId = request.params.orderId;

  //Criando a SQL query e realizando busca de "order" no banco de dados.
  databaseConnection.query("SELECT * FROM orders WHERE orderId = ?", [orderId], (error, orderResult) => {
      
      //Em caso de erro retorna HTTP status: 500 - Internal Server Error.
      if (error) {
        return response.status(500).json(error);
      }

      //Se orderResult for vazio retorna HTTP status: 404 - Not Found.
      if (orderResult.length === 0) {
        return response.status(404).json({ message: "Pedido não encontrado!" });
      }

      //Criando a SQL query e realizando busca de "items" no banco de dados.
      databaseConnection.query("SELECT * FROM items WHERE orderId = ?", [orderId], (error, itemsResult) => {

        //Retorna HTTP status: 200 - OK Status Code, mais um JSON com o pedido e seus items.
        response.status(200).json({
          order: orderResult[0],
          items: itemsResult
        });
      });

  });
};

/*
 * UPDATE
 */
exports.updateOrder = (request, response) => {

  //Extrai id dos parâmetros da request e salva em "orderId"
  const orderId = request.params.orderId;

  //Destructuring do body da request pegando "valorTotal" para atualizar no pedido.
  const { valorTotal } = request.body;

  //Criando a SQL query e realizando UPDATE do pedido no banco de dados.
  databaseConnection.query("UPDATE orders SET value = ? WHERE orderId = ?", [valorTotal, orderId], (error) => {
      
      //Em caso de erro retorna HTTP status: 500 - Internal Server Error.
      if (error) {
        return response.status(500).json(error);
      }

      //Retorna HTTP status: 200 - OK Status Code.
      response.status(200).json({ message: "Pedido atualizado com sucesso!" });
      
  });

}

/*
 * DELETE
 */
exports.deleteOrder = (request, response) => {

  //Extrai id dos parâmetros da request e salva em "orderId"
  const orderId = request.params.orderId;

  //Criando a SQL query e realizando DELETE dos itens do pedido no banco de dados.
  databaseConnection.query("DELETE FROM items WHERE orderId = ?", [orderId]);
  
  //Criando a SQL query e realizando DELETE do pedido no banco de dados.
  databaseConnection.query("DELETE FROM orders WHERE orderId = ?", [orderId], (error) => {

      //Em caso de erro retorna HTTP status: 500 - Internal Server Error.
      if (error) {
        return response.status(500).json(error);
      }

      //Retorna HTTP status: 200 - OK Status Code.
      response.status(200).json({ message: "Pedido deletado com sucesso!" });

  });

}
