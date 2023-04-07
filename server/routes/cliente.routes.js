const ClienteController = require("../controllers/cliente.controller");

module.exports = function (app) {
  app.post("/api/cliente", ClienteController.createCliente);
  app.post("/api/cliente/:id", ClienteController.crearCuenta);
  app.delete("/api/cliente/:id/:idCuenta", ClienteController.eliminarCuenta);
  app.put(
    "/api/cliente/:id/cuentas/:idCuenta",
    ClienteController.actualizarCuenta
  );
  app.get(
    "/api/cliente/:id/cuentas/:idCuenta",
    ClienteController.obtenerCuenta
  );
  app.get("/api/cliente/:id/cuentas", ClienteController.findCuentas);
  app.get("/api/cliente", ClienteController.findAllClientes);
  app.get("/api/cliente/:id", ClienteController.getCliente);
  app.put("/api/cliente/:id", ClienteController.updateCliente);
  app.delete("/api/cliente/:id", ClienteController.deleteCliente);
};
