const express = require("express");

const carsDB = require("./carsModel.js");

const middleware = require("../middleware");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const cars = await carsDB.getAll(req.query);
		res.status(200).json(cars);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The listing of cars could not be retrieved."
		});
	}
});

router.get("/:id", middleware.checkCarId, async (req, res) => {
	try {
		res.status(200).json(req.car);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The information for the car specified could not be retrieved."
		});
	}
});

router.post("/", middleware.checkCar, async (req, res) => {
	try {
		const car = await carsDB.insert(req.body);
		res.status(201).json(car);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "There was an error while adding the car to the database"
		});
	}
});

router.delete("/:id", middleware.checkCarId, async (req, res) => {
	try {
		const count = await carsDB.remove(req.params.id);
		if (count > 0) {
			res.status(200).json(req.car);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The car could not be removed from the database"
		});
	}
});

router.put(
	"/:id",
	middleware.checkCarId,
	middleware.checkCar,
	async (req, res) => {
		try {
			const newCar = await carsDB.update(req.params.id, req.body);
			res.status(200).json(newCar);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "something went wrong" });
		}
	}
);

module.exports = router;