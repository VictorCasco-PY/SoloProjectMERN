const { Cliente } = require("../models/cliente.model");

//Crear un nuevo cliente
module.exports.createCliente = async (request, response) => {
  try {
    const { ci, nombre, apellido, correo, descripcion, monto, vencimiento } =
      request.body;
    const cliente = await Cliente.create({
      ci,
      nombre,
      apellido,
      correo,
      descripcion,
      monto,
      vencimiento,
    });
    response.json(cliente);
  } catch (error) {
    response.json(error);
  }
};

//Listar todos los clientes
module.exports.findAllClientes = async (request, response) => {
  try {
    const listaCliente = await Cliente.find({});
    response.json(listaCliente);
  } catch (error) {
    response.json(error);
  }
};

//Mostrar un solo cliente por ID
module.exports.getCliente = async (request, response) => {
  try {
    const cliente = await Cliente.findOne({ _id: request.params.id });
    response.json(cliente);
  } catch (error) {
    response.json(error);
  }
};

//Actualizar un cliente
module.exports.updateCliente = async (request, response) => {
  try {
    const updatedCliente = await Cliente.findOneAndUpdate(
      { _id: request.params.id },
      request.body,
      { new: true }
    );
    response.json(updatedCliente);
  } catch (error) {
    response.json(error);
  }
};

//Eliminar cliente
module.exports.deleteCliente = async (request, response) => {
  try {
    const deletedCliente = await Cliente.deleteOne({
      _id: request.params.id,
    });
    response.json(deletedCliente);
  } catch (error) {
    response.json(error);
  }
};
