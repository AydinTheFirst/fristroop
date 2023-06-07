import express from "express";
import { web } from "./web.router.js";
import { api } from "./api.router.js";

export const router = express.Router();

router.use("/", web);
router.use("/api", api);
