const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const routes = require("./1-routes");

// swagger opts
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "JemerSoft test Pokemons API",
      version: "0.0.1",
    },
  },
  apis: ["./1-routes.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// App
const app = express();

// swagger as middleware
app.use("/poke-api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/", routes); //importing 1-routes.js

// cors and parsers
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// error catch endware
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const PORT = process.env.PORT || 5000;

// server run - use "node index.js" or "nodemon run dev"
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
