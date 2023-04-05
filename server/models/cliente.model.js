const mongoose = require("mongoose");

const CuentaSchema = new mongoose.Schema(
  {
    descripcion: { type: String },
    monto: { type: Number },
    vencimiento: { type: Date },
  },
  { timestamps: true }
);

const ClienteShema = new mongoose.Schema(
  {
    ci: { type: Number, unique: true },
    nombre: { type: String },
    apellido: { type: String },
    correo: { type: String },
    cuentas: [CuentaSchema],
  },
  { timestamps: true }
);
module.exports.Cliente = mongoose.model("Cliente", ClienteShema);
