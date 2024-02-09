import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";
import user from "../src/user/user.routes.js";
import animal from "../src/animal/animal.routes.js";

const app = express();
const port = process.env.ASD;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/user", user);
app.use("/animal", animal);

export const initServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
