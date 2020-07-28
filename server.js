const express = require("express");

const carsRouter = require("./cars/carsRouter");

const server = express();

server.get("/", (req, res) => {
	res.send(`<h2>WebDB II Challenge</h2>`);
});

server.use(express.json());

server.use("/api/cars", carsRouter);

server.use(errorHandler);

function errorHandler(error, req, res, next) {
	console.log(error);
	res.status(500).json({ error: "Data could not be retrieved" });
}

module.exports = server;
