import express from "express";
import Router from "./routes/index.js";
import Sqlize, { Auth } from "./config/sequelize.js";
import { User, Todo } from "./models/index.js";
import InitData from "./data/index.js";

const app = express();
const port = process.env.PORT || 3000;

await Auth();
await User.sync();
await Todo.sync();
await InitData();

// parse req.body
app.use(express.json());
app.use(express.urlencoded(
    { extended: false }
));

app.use('/', Router);

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});