const express = require("express");
const dB = require("./data/dbConfig");
const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const accounts = await dB.select("*").from("accounts");
		res.json(accounts);
	} catch (err) {
		next(err);
	}
});

router.post("/", (req, res) => {
	try {
	} catch (err) {
		next(err);
	}
});

router.put("/:id", (req, res) => {
	try {
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", (req, res) => {
	try {
	} catch (err) {
		next(err);
	}
});

module.exports = router;
