import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  keeper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export default mongoose.model("Animal", animalSchema);