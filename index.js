import express from "express";
import dotenv from "dotenv";
import Router from "./routes/index.js";
import { User, Todo } from "./models/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

await Todo.sync();
await User.sync();

// parse req.body
app.use(express.json());
app.use(express.urlencoded(
    { extended: false }
));

app.use('/', Router);

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});