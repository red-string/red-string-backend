const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
	__dirname + "/db/test.db",
	sqlite3.OPEN_READWRITE,
	err => {
		if (err) {
			console.error(err.message);
		}
		console.log("Connected to the chinook database.");
	}
);
