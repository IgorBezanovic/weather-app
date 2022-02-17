const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (request, response) => {
  response.render("index", {
    name: "Igor",
    lastName: "Bezanovic",
  });
});

app.get("/about", (request, response) => {
  response.render("about", {
    name: "Igor",
    lastName: "Bezanovic",
  });
});

app.get("/help", (request, response) => {
  response.render("help", {
    name: "Igor",
    lastName: "Bezanovic",
  });
});

app.get("/weather", (request, response) => {
  if (!request.query.address) {
    return response.send({
      placeInfo: "Morate proslediti lokaciju",
    });
  }

  geocode(request.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) return response.send({ error });

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return response.send({ error });
      response.send({
        forecast: forecastData,
        place_info: `Address is ${request.query.address}`,
        location,
        latitude,
        longitude
      });
    });
  });
});

app.get("/products", (request, response) => {
  if (!request.query.search) {
    return response.send({
      product: "Morate proslediti search parametar",
    });
  }

  response.send({
    product: [],
  });
});

app.get("/help/*", (request, response) => {
  response.render("404", {
    name: "Igor",
    lastName: "Bezanovic",
    errorMessage: "help article not found",
  });
});

app.get("*", (request, response) => {
  response.render("404", {
    name: "Igor",
    lastName: "Bezanovic",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server works");
});
