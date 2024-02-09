import express from "express";
import {
  getAnimals,
  addAnimal,
  searchAnimal,
  updateAnimal,
  deleteAnimal
} from "./animal.controller.js";

const router = express.Router();

router.get("/", getAnimals);
router.post("/add", addAnimal);
router.get("/search/:name?", searchAnimal);
router.put("/update/:id", updateAnimal);
router.delete("/delete/:id", deleteAnimal);

export default router;
