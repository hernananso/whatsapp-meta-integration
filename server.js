const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = "centros-educativos-verify";

app.get("/", (req, res) => {
  res.send("WhatsApp Meta Integration - Centros Educativos OK");
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
