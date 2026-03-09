/*
 * Cria instância do mysql2 (permite interação com Bases de dados MySQL).
 */
const mysql2 = require("mysql2");

/*
 * Estado da conexão é salvo em connection.
 */
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app_db",
});

/*
 * Estabelecimento da conexão, devolvendo msg de erro/sucesso.
 */
connection.connect((error) => {
  if (error) {
    console.error("Falha na conexão com banco de dados: ", error);
    return;
  }
  console.log("Conexão com banco de dados bem sucedida!");
});

/*
 * Export da constante para uso nas demais partes da aplicação.
 */
module.exports = connection;
