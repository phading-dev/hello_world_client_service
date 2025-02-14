import express = require("express");
import http = require("http");
import promClient = require("prom-client");
import fetch = require("node-fetch");

async function main() {
  let app = express();
  app.get("/healthz", (req, res) => {
    res.end("OK");
  });
  app.get("/metricsz", async (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.end(await promClient.register.metrics());
  });
  app.get("/c", async (req, res) => {
    let response = await (
      await fetch("http:///hw")
    ).text();
    res.send(`Calling phading-ingress-internal/hw: ${response}`);
  });
  http
    .createServer(app)
    .listen(8080, () => console.log("Listening on port 8080"));
  http
    .createServer(app)
    .listen(8081, () => console.log("Listening on port 8081"));
}

main();
