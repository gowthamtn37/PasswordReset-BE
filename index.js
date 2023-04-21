import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import cors from "cors";
import userRouter from "./routers/users.router.js";

const app = express();
const PORT = process.env.PORT;

const Mongo_url = process.env.Mongo_url;
export const Client = new MongoClient(Mongo_url);
await Client.connect();
console.log(`MongoDB connected`);

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server Connedted : ${PORT}`);
});
