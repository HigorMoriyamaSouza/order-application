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


Recursos Adicionais Implementados: 
● Autenticação básica usando tokens JWT. 
  -> OBS: instruções para criação do usuário para testes da API estão no arquivo "generateHash.js".
  
● Documentação da API com Postman.
  -> Segue link da documentação do projeto: https://documenter.getpostman.com/view/50687802/2sBXcLhdiG

Comandos SQL para criação da base de dados do projeto:
    CREATE DATABASE orderdb;

    USE orderdb;

    ● Tabela de usuários:
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
   
    ● Tabela de pedidos:
        CREATE TABLE Orders (
            orderId VARCHAR(50) PRIMARY KEY,
            value DECIMAL(10,2),
            creationDate DATETIME
        );

    ● Tabela de itens:
        CREATE TABLE Items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            orderId VARCHAR(50),
            productId INT,
            quantity INT,
            price DECIMAL(10,2),
            FOREIGN KEY (orderId) REFERENCES Orders(orderId)
        );