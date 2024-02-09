"use strict";

import express from "express";
import { test, register, update, login } from "./user.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", update);

export default router;
