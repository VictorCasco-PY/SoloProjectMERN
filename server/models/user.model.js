const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UsuarioSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Usuario requerido"],
    },
    password: {
      type: String,
      required: [true, "Contraseña requerida"],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    },
  },
  { timestamps: true }
);

UsuarioSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UsuarioSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

UsuarioSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario;
