import * as dotenv from "dotenv";
dotenv.config();
import express, { request, response } from "express";
import mongoose from "mongoose";

import Router from "./routes/formRoute.js";
import cors from "cors";

const app = express();

// port
const PORT = 4400;

// middleware for parsing request body
app.use(express.json());

const dbURl = process.env.mongoDBURL;



// allow all origins with default of cors(*)
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.send("Welcome to MERN stack Book Store");
});

// backend endpoint
app.use("/data", Router);

// mongoose for database
mongoose
  .connect(dbURl)
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`App is running on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
