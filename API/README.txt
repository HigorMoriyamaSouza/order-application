Tema do projeto: Aplicação back-end para gerenciamento de pedidos.
Nome do projeto: Projeto Order Application
Desenvolvedor do projeto: Higor Moriyama Souza

Resumo do tema do projeto: Desenvolver uma API em node.js usando linguagem JavaScript para gerenciar pedidos, a API deve permitir um CRUD de pedidos.

O projeto foi desenvolvido atendendo aos requisitos abaixo:

Requisitos do projeto:
Criar endpoints para as seguintes operações:
- Criar um novo pedido. (Obrigatório). URL: http://localhost:3000/order
- Obter os dados do pedido passando por parâmetro na URL o número do pedido. (Obrigatório) URL: http://localhost:3000/order/v10089016vdb
- Listar todos os pedidos. (Opcional) URL: http://localhost:3000/order/list 
- Atualizar o pedido passando por parâmetro na url o número do pedido que será atualizado. (Opcional) URL: http://localhost:3000/order/v10089016vdb
- Delete o pedido passando por parâmetro na url o número do pedido que será deletado.. (Opcional) URL: http://localhost:3000/order/v10089016vdb

Armazenar os dados dos pedidos em um banco de dados (Mongodb, SQL ou PostgreSql). 
● Tabela: Order                    ● Tabela: Items 
 ○ Coluna: orderId                   ○ Coluna: orderId 
 ○ Coluna: value                     ○ Coluna: productId 
 ○ Coluna: creationDate              ○ Coluna: quantity
                                     ○ Coluna: price 
