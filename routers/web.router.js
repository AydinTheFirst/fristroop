import express from "express";

export const web = express.Router();

web.get("/", (req,res) => {
    res.render("index", {
        title: "Home"
    });
})
