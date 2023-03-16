const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 8000;
const enviarCorreo = require("./utils/enviarCorreo");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(cookieParser());

require("./routes/user.routes")(app);
require("./routes/cliente.routes")(app);

//Envio de correos
app.post("/api/sendemail", async (req, res) => {
  const { nombre, correo, descripcion, monto, vencimiento } = req.body;

  try {
    const send_to = correo;
    const sent_from = "boutiquedmarhoh@gmail.com";
    const reply_to = correo;
    const subject = "Recordatorio de vencimiento de cuenta";
    const message = `
        <h3>Hola, ${nombre}</h3>
        <hr />
        <p>Descripcion: ${descripcion}</p>
        <p>Monto: ${monto}</p>
        <p>Vencimiento: ${vencimiento}</p>
        <p>Saludos...</p>
    `;

    await enviarCorreo(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.listen(port, () => console.log(`Connected at port: ${port}`));
