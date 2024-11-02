
/**
 * [i]: 在這個檔案中我運用了 data.txt 去模擬資料庫的使用及其限制
 */
import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

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