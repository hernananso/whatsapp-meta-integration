const express = require("express");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  next();
});
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = "centros-educativos-verify";

app.get("/", (req, res) => {
  res.send("WhatsApp Meta Integration - Centros Educativos OK");
});

app.get("/privacy", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Política de Privacidad - Centros Educativos</title>
    </head>
    <body>
      <h1>Política de Privacidad</h1>
      <p><strong>Centros Educativos</strong></p>

      <p>
        Esta aplicación utiliza la plataforma oficial de WhatsApp Business
        de Meta para gestionar comunicaciones entre Centros Educativos
        y sus alumnos, interesados y contactos.
      </p>

      <p>
        Los datos personales y la información de las conversaciones
        se utilizan únicamente para gestionar comunicaciones,
        consultas, avisos administrativos y servicios educativos.
      </p>

      <p>
        No vendemos datos personales ni los utilizamos para fines
        distintos de los relacionados con nuestros servicios.
      </p>

      <p>
        Podemos utilizar proveedores de infraestructura tecnológica
        necesarios para el funcionamiento de la aplicación y los
        servicios oficiales de Meta/WhatsApp.
      </p>

      <p>
        Los usuarios pueden solicitar información, rectificación o
        eliminación de sus datos contactándose con Centros Educativos.
      </p>

      <p>Última actualización: septiembre de 2026.</p>
    </body>
    </html>
  `);
});

app.get("/webhook", (req, res) => {
  console.log("GET /webhook recibido");
  console.log("QUERY:", req.query);

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("MODE:", mode);
  console.log("TOKEN:", token);
  console.log("CHALLENGE:", challenge);

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFICADO");
    return res.status(200).send(String(challenge));
  }

  console.log("VERIFICACION RECHAZADA");
  return res.sendStatus(403);
});

app.post("/webhook", (req, res) => {
  console.log("POST /webhook recibido");
  console.log(JSON.stringify(req.body, null, 2));
  return res.sendStatus(200);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
