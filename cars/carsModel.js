const db = require("../data/dbConfig.js");

module.exports = {
	getAll: function() {
		return db("cars");
	},
	getById: function(id) {
		return db("cars")
			.where("CarID", id)
			.first();
	},
	insert: function(car) {
		return db("cars")
			.insert(car)
			.then(([id]) => this.getById(id).first());
	},
	update: function(id, changes) {
		return db("cars")
			.where("CarID", id)
			.update(changes)
			.then(count => (count > 0 ? this.getById(id) : null));
	},
	remove: function(id) {
		return db("cars")
			.where("CarID", id)
			.del();
	}
};
