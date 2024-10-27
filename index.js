import express from "express";
import fs from "fs";

const app = express();
const port = 3000;
// let count = {};

app.get('/', async (req, res) => {
    
    const filePath = './data.txt';
    const visitorName = req.query.name;
    let count = JSON.parse(fs.readFileSync(filePath).toString());
    
    if (!count[visitorName]) count[visitorName] = 0;
    
    count[visitorName]++;

    const newCount = JSON.stringify(count, null, 4);
    fs.writeFileSync(
        filePath,
        newCount,
        (err) => {
            if (err) console.log(`Error on writing at ${filePath}: `, err);
        }
    );
    
    res.send(`Hello ${visitorName}, visit count: ${count[visitorName]}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});