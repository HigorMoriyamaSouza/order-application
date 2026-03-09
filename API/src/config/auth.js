/*
 * Como estamos desenvolvendo uma API simplise, criaremos um segredo JWT
 * de forma simples ao invés de usar "process.env.JWT_SECRET".
*/
module.exports = {
  secret: "super_secret_key"
};