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
    });
    response.json(cliente);
  } catch (error) {
    response.json(error);
  }
};

//Agrega una cuenta al arreglo de cuentas
module.exports.crearCuenta = async (request, response) => {
  const { descripcion, monto, vencimiento } = request.body;
  try {
    const cliente = await Cliente.findById(request.params.id);
    cliente.cuentas.push({ descripcion, monto, vencimiento });
    await cliente.save();
    response.status(201).json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al agregar cuenta al cliente" });
  }
};

//Elimina una cuenta por su ID
module.exports.eliminarCuenta = async (req, res) => {
  const { id, idCuenta } = req.params;
  try {
    const cliente = await Cliente.findById(id);
    const cuentaIndex = cliente.cuentas.findIndex(
      (cuenta) => cuenta._id == idCuenta
    );
    if (cuentaIndex === -1) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }
    cliente.cuentas.splice(cuentaIndex, 1);
    await cliente.save();
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar cuenta del cliente" });
  }
};

//Listar cuentas
module.exports.findCuentas = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id, "cuentas");
    res.json(cliente.cuentas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener cuentas del cliente" });
  }
};

//Actualizar una cuenta por su ID
module.exports.actualizarCuenta = async (req, res) => {
  const { id, idCuenta } = req.params;
  const { descripcion, monto, vencimiento } = req.body;
  try {
    const cliente = await Cliente.findById(id);
    const cuentaIndex = cliente.cuentas.findIndex(
      (cuenta) => cuenta._id == idCuenta
    );
    if (cuentaIndex === -1) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }
    cliente.cuentas[cuentaIndex] = { descripcion, monto, vencimiento };
    await cliente.save();
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar cuenta del cliente" });
  }
};

//Obtener una cuenta de un cliente por su id
module.exports.obtenerCuenta = async (req, res) => {
  const { id, idCuenta } = req.params;

  try {
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const cuenta = cliente.cuentas.find((cuenta) => cuenta._id == idCuenta);
    if (!cuenta) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }

    res.json(cuenta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener cuenta del cliente" });
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
