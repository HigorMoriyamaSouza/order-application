/*
 * Este middleware fará a leitura e validação do token, 
 * permitindo o acesso caso o mesmo seja válido.
 */

//Cria instância de JWT - responsável por criar e validar tokens.
const jwt = require("jsonwebtoken");

//Cria instância de "auth.js".
const authConfig = require("../config/auth");

module.exports = (request, response, next) => {

    /*
     * Realiza a leitura de Authorizarion(Bearer-Token) 
     * presente no headers da requisição HTTP.
     */
    const authHeader = request.headers.authorization;

    //Caso Authorization esteja vazio retorna HTTP status: 401 - Unauthorized.
    if (!authHeader) {
        /*
         * Como no caso estamos tratando da existência de um token, 
         * podemos dizer ao usuário que o token não foi fornecido.
         */
        return response.status(401).json({ message: "Token ausente!" });
    }

    //Divíde token em 2 partes pelo caractere " ".
    const parts = authHeader.split(" ");

    //Caso comprimento de parts seja !== 2, retorna HTTP status: 401 - Unauthorized. 
    if (parts.length !== 2) {
        //Informa ao usuário que o token está com erro.
        return response.status(401).json({ message: "Token com erro!" });
    }

    /*
     * Caso "parts.length == 2", aqui realizamos um destructuring
     * de parts, pegando a 1ª parte (scheme) e a 2ª parte(token).
     */
    const [scheme, token] = parts;

    /*
     * Se (scheme !== "Bearer") retorna HTTP status: 401 - Unauthorized.
     */
    if (!/^Bearer$/i.test(scheme)) {
        //Informa ao usuário que o token está fora do formato adequado.
        return response.status(401).json({ message: "Token fora do formato adequado!" });
    }

    //Realiza validação do token.
    jwt.verify(token, authConfig.secret, (error, decoded) => {

        //Caso ocorra algum erro retorna HTTP status: 401 - Unauthorized.
        if (error) {
            //Informa ao usuário que o token está inválido.
            return response.status(401).json({ message: "Token inválido!" });
        }

        /*
         * De forma resumida, o comando abaixo permite que todos os
         * endpoints acessem o usuário autenticado.
         */
        request.userId = decoded.id;

        /*
         * next() práticamente diz ao Express que a autenticação foi
         * bem sucedida, podendo prosseguir para o próximo middleware ou 
         * endpoint.
         */
        return next();
    });
};