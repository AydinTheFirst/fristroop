import express from "express";

export const api = express.Router();

api.get("/", (req, res) => {
	res.send({ message: "True" });
});

api.post("/test", (req,res) => {
    console.log(req.body);
    console.log(req.files)
    res.redirect("/")
})