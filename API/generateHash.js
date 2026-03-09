/*
 * USUÁRIO DE TESTES: 
 */

/*
 * CRIAR SENHA HASH: 
 * Execute este comando no terminal: "node generateHash.js"
 * 
 * Com sua senha em Hash, basta criar o usuário de teste no banco de dados,
 * para isto execute o comando SQL abaixo no banco de dados:
 * SQL ->> INSERT INTO users (email, password) VALUES ('admin@email.com','SUA_SENHA_HASH_GERADA_NO_TERMINAL');
 * 
 * Após a criação do usuário em banco basta realizar os testes:
    - Request: POST - http://localhost:3000/login
    - Body:
            {
            "email": "admin@email.com",
            "password": "123456"
            }

    - Response:
            {
            "message": "Login successful",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
 */

const bcrypt = require("bcrypt");

bcrypt.hash("123456", 10).then(hash => {
    console.log("HASH: " + hash);
});
