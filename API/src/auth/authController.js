//Cria instância de JWT - responsável por criar e validar tokens.
const jwt = require("jsonwebtoken");

//Cria instância do bcrypt - responsável pela criptográfia de senhas.
const bcrypt = require("bcrypt");

//Cria instâncias de "databaseConnection.js e auth.js".
const databaseConnection = require("../database/databaseConnection");
const authConfig = require("../config/auth");

exports.login = (request, response) => { 
    //Destructuring do request.body, pegando email e senha do usuário.
    const { email, password } = request.body;

    /*
     * Criando a SQL query para buscar "user" no banco de dados.  
     * "async" na anonymous arrow function, sinaliza uma espera por uma promisse.
     */
    databaseConnection.query("SELECT * FROM users WHERE email = ?", [email], async (error, result) => {
            //Em caso de erro retorna HTTP status: 500 - Internal Server Error.
            if (error) {
                return response.status(500).json(error);
            }

            //Se result for vazio retorna HTTP status: 401 - Unauthorized.
            if (result.length === 0) {
                return response.status(401).json({ message: "Usuário não encontrado!" });
            }

            //Caso nenhum erro ocorra, o usuário encontrado é salvo em user.
            const user = result[0];

            /*
             * Aqui a execução da anonymous arrow function pausa para realizar a 
             * comparação entre a senha passada pelo usuário na request.body e a 
             * senha salva no banco de dados. 
            */
            const passwordMatch = await bcrypt.compare(password, user.password);

            //Se não houver match entre as senhas, retorna HTTP status: 401 - Unauthorized. 
            if (!passwordMatch) {
                /*
                 * Como no caso estamos tratando a comparação entre senhas, 
                 * podemos dizer ao usuário que a senha é inválida.
                 */
                return response.status(401).json({ message: "Senha inválida!" });
            }

            //Gera token de acesso para o usuário válido por 1 hora.
            const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: "1h" });

            //Retorna HTTP status: 200 - OK Status Code, mais email e token de acesso.
            response.status(200).json({
                user: user.email,
                token: token
            });
        }
    );
};