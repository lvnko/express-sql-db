import express from "express";
import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'TodoList',
});

// parse req.body
app.use(express.json());
app.use(express.urlencoded(
    { extended: false }
));

const standardErrorHandler = (res, err) => {
    res.status(err.status || 500);
    console.log('err => ', err);
    res.json({
        err: err.message,
        // ...message ? { message } : null
    });
    res.end();
    return;
}

const customErrorHandler = (res, message) => {
    res.status(404);
    res.json({
        err: {
            message: message
        },
    });
    res.end();
    return;

}

const customFaultHandler = (res, message) => {
    return res.send({
        statusText: "fail",
        message: message
    });
}

const getConnection = () => {
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if (err) reject(err);
            else resolve(connection);
        });
    });
}

const executeQuery = (conn, query, data) => {
    return new Promise((resolve, reject)=>{
        conn.query(query, data, (err, results, fields)=>{
            if (err) reject(err);
            else resolve({results, fields});
        });
    });
}

const verifyThenExtractData = (req, requiredFields, actionLabel = 'take the requested action') => {
    const blankReport  = { valid: false };
    if (!req.body) return {
        ...blankReport,
        result: `Failed to ${actionLabel}, a data body is required!`
    };
    const bodyFieldKeys = Object.keys(req.body);
    const invalidFields = bodyFieldKeys.filter(
        key => req.body[key] === false || typeof req.body[key] === 'number' ?
            false : !req.body[key]
    );
    const invalidityCount = invalidFields.length;
    const missingFields = requiredFields.filter(key => bodyFieldKeys.indexOf(key) < 0);
    const missingCount = missingFields.length;
    if (invalidityCount) return {
        ...blankReport,
        result: `Failed to ${actionLabel}, valid data of ${invalidFields.join(", ")} ${invalidityCount > 1  ? 'are':'is'} required!`
    };
    if (missingCount) return {
        ...blankReport,
        result: `Failed to ${actionLabel}, data of ${invalidFields.join(", ")} ${invalidityCount > 1  ? 'are':'is'} required!`
    };
    return {
        valid: true,
        result: requiredFields.reduce((accm, curr) => [ ...accm, req.body[curr] ], [])
    }
}

// 新增 User
app.post('/', async (req, res) => {

    const requiredKeys = ['id', 'givenName', 'familyName', 'gender', 'email'];
    const verification = verifyThenExtractData(req, requiredKeys, 'insert user');
    if (!verification.valid) return customFaultHandler(res, verification.result);
    
    const data = verification.result;

    try {

        const connection = await getConnection();
        const { results, fields } = await executeQuery(
            connection, `INSERT INTO User VALUES (?, ?, ?, ?, ?)`, data
        );
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(results));
        res.end();

    } catch(error) {
        return standardErrorHandler(res, error);
    }
});

// 取得所有 User
app.get('/', async (req, res )=> {

    try {

        const connection = await getConnection();
        const { results, fields } = await executeQuery(
            connection,
            `SELECT * FROM User`
        );
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(results));
        res.end();

    } catch(error) {
        return standardErrorHandler(res, error);
    }
});

// 取得某個 User
app.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const connection = await getConnection();
        const { results, fields } = await executeQuery(
            connection,
            `SELECT * FROM User WHERE id=?`, [id]
        );
        res.setHeader('Content-Type', 'application/json');
        if (results.length <= 0) return customErrorHandler(res, `There is no record found from Users with id as ${id}.`);
        res.write(JSON.stringify(results[0]));
        res.end();

    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

// 更新某個 User
app.put('/:id', async (req, res) => {

    const coreCorrKeys = {
        givenName: 'given_name',
        familyName: 'family_name',
        gender: 'gender',
        email: 'email',
    };

    const coreKeys = Object.keys(coreCorrKeys);
    const retrievedFields = Object.keys(req.body).filter((key)=>coreKeys.indexOf(key)>=0);

    const verification = verifyThenExtractData(req, retrievedFields, 'update user');
    if (!verification.valid) return customFaultHandler(res, verification.result);
    
    const columsSqlInterface = retrievedFields.map(key=>`${coreCorrKeys[key]}=?`).join(", ");
    console.log('columsSqlInterface => ', columsSqlInterface);
    const data = [...verification.result, parseInt(req.params.id)];
    console.log('data => ', data);

    try {

        const connection = await getConnection();
        const { results, fields } = await executeQuery(
            connection, `UPDATE User SET ${columsSqlInterface} WHERE id=?`, data
        );
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(results));
        res.end();

    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

// 刪除某個 User
app.delete('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const connection = await getConnection();
        const { results, fields } = await executeQuery(
            connection,
            `DELETE FROM User WHERE id=?`, [id]
        );
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(results));
        res.end();

    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});