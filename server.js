import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import StudentRouter from "./routers/StudentRoute.js";
import RequestRouter from "./routers/RequestRoute.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://user:user@cluster0.wekkhaa.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connecté à MongoDB Atlas');
  })
  .catch(err => {
    console.error('Erreur de connexion à MongoDB Atlas :', err);
  });

app.use(cors());
app.use("/api/students", StudentRouter);
app.use("/api/requests", RequestRouter);


app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});