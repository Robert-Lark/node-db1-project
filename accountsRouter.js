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

router.get("/:id", async (req, res, next) => {
	try {
		const [account] = await dB.select("*").from("accounts").where("id", req.params.id).limit(1);
		res.json(account);
	} catch (err) {
		next(err);
	}
});

router.post("/", async (req, res, next) => {
	try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        if (!payload.name || !payload.budget) {
            console.log(payload)
            return res.status(400).json({
                message: "Need a name and budget"
            })
        }
        const [id] = await dB.insert(payload).into("accounts")
        const newAccount = await dB.first("*").from("accounts").where("id", id)
                res.status(201).json(newAccount)
	} catch (err) {
		next(err);
	}
});

router.put("/:id", async (req, res, next) => {
try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        if (!payload.name || !payload.budget) {
            return res.status(400).json({
                message: "Need a name and budget"
            })
        }
        await dB("accounts").where("id", req.params.id).update(payload)
                const newAccount = await dB
									.first("*")
									.from("accounts")
									.where("id", req.params.id);
								res.status(201).json(newAccount);
        res.json(newAccount)
	} catch (err) {
		next(err);
	}
});

router.delete("/:id",async (req, res, next) => {
	try {
        await dB("accounts").where("id", req.params.id).del()
        res.status(204).end()
	} catch (err) {
		next(err);
	}
});

module.exports = router;
