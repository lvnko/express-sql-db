import express from "express";
import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const app = express();
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'TodoList',
});
connection.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      return;
    }
    console.log('Connected to database');
});


const port = process.env.PORT || 3000;

app.get('/', async (req, res )=> {
    res.write(`Hello World!!`);
    res.end();
});

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});