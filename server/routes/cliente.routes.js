const ClienteController = require("../controllers/cliente.controller");

module.exports = function (app) {
  app.post("/api/cliente", ClienteController.createCliente);
  app.get("/api/cliente", ClienteController.findAllClientes);
  app.get("/api/cliente/:id", ClienteController.getCliente);
  app.put("/api/cliente/:id", ClienteController.updateCliente);
  app.delete("/api/cliente/:id", ClienteController.deleteCliente);
};
