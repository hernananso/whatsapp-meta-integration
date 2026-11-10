
const express = require("express");
const crypto = require("node:crypto");

const app = express();
const PORT = process.env.PORT || 3000;

const APP_ID = "1578375223661784";
const CONFIG_ID = "1094012923132007";
const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN ||
  "centros-educativos-verify";

const BASE_URL =
  "https://whatsapp-meta-integration-lzm9.onrender.com";

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.send("WhatsApp Meta Integration - Centros Educativos OK");
});

// Política de privacidad existente
app.get("/privacy", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, initial-scale=1">
      <title>Política de Privacidad - Centros Educativos</title>
    </head>
    <body>
      <h1>Política de Privacidad</h1>
      <p><strong>Centros Educativos</strong></p>
      <p>
        Esta aplicación utiliza la plataforma oficial de
        WhatsApp Business de Meta para gestionar comunicaciones
        entre Centros Educativos y sus alumnos, interesados
        y contactos.
      </p>
      <p>
        Los datos personales y la información de las
        conversaciones se utilizan únicamente para gestionar
        comunicaciones, consultas, avisos administrativos
        y servicios educativos.
      </p>
      <p>
        No vendemos datos personales ni los utilizamos para
        fines distintos de nuestros servicios.
      </p>
      <p>
        Podemos utilizar proveedores de infraestructura
        tecnológica necesarios para el funcionamiento
        de la aplicación y los servicios oficiales de Meta.
      </p>
      <p>
        Los usuarios pueden solicitar información,
        rectificación o eliminación de sus datos
        contactándose con Centros Educativos.
      </p>
      <p>Última actualización: septiembre de 2026.</p>
    </body>
    </html>
  `);
});

// Verificación del webhook
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === VERIFY_TOKEN &&
    typeof challenge === "string"
  ) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Recepción de eventos de WhatsApp
app.post("/webhook", (req, res) => {
  // La validación de firma de Meta se incorporará
  // antes de procesar mensajes o datos personales.
  console.log("Evento de webhook recibido");
  return res.sendStatus(200);
});

// Página informativa de Embedded Signup
app.get("/embedded-signup", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, initial-scale=1">
      <title>WhatsApp - Centros Educativos</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 680px;
          margin: 70px auto;
          padding: 20px;
          line-height: 1.6;
        }
        h1 { color: #123c76; }
        .notice {
          padding: 18px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
      <h1>Centros Educativos</h1>
      <h2>Integración de WhatsApp Business</h2>
      <div class="notice">
        <p>Servidor de integración disponible.</p>
        <p>Aplicación Meta: ${APP_ID}</p>
        <p>Configuración: ${CONFIG_ID}</p>
        <p>
          La vinculación de WhatsApp Business
          todavía no está habilitada desde esta página.
        </p>
        <p>
          Primero debemos verificar los requisitos
          de coexistencia y completar la autorización segura.
        </p>
      </div>
    </body>
    </html>
  `);
});

// Ruta de retorno reservada para OAuth
app.get("/auth/meta/callback", (req, res) => {
  res.status(503).type("text").send(
    "La autorización de Meta todavía no está habilitada. " +
    "No se ha conectado ni modificado ningún número."
  );
});

// Comprobación de configuración sin exponer secretos
app.get("/integration/status", (req, res) => {
  res.json({
    service: "Centros Educativos WhatsApp",
    server: "online",
    app_id: APP_ID,
    configuration_id: CONFIG_ID,
    access_token_configured:
      Boolean(process.env.WHATSAPP_ACCESS_TOKEN),
    embedded_signup_enabled: false,
    coexistence_enabled: false
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});

