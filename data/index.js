import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import { Todo, User } from "../models/index.js";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const userJsonFilePath = path.join(
    __dirname,
    "./user.json"
);

const todoJsonFilePath = path.join(
    __dirname,
    "./todo.json"
);

const getDataJson = (jsonPath) => {
    return new Promise((resolve, reject)=>{
        fs.readFile(
            jsonPath,
            (err, data) => {
                if (err) {
                    console.log(`Error on reading ${jsonPath}: `,err);
                    reject(err);
                } else {
                    resolve(JSON.parse(data.toString()));
                }
            }
        );
    });
}

const getUserData = async () => {
    try {
        const userData = await getDataJson(userJsonFilePath);
        return userData;
    } catch (error) {
        return null;
    }
}

const getTodoData = async () => {
    try {
        const todoData = await getDataJson(todoJsonFilePath);
        return todoData;
    } catch (error) {
        return null;
    }
}

export default async function InitData() {

    try {

        const usersCount = await User.count();

        if (usersCount === 0) {

            const userData = await getUserData();
            await User.bulkCreate(userData);
            console.log('Initial User data inserted.');
            
        } else {
            console.log('User data already exists.');
        }

        const todosCount = await Todo.count();
        
        if (todosCount === 0) {

            const todoData = await getTodoData();
            await Todo.bulkCreate(todoData);
            console.log('Initial Todo data inserted.');
            
        } else {
            console.log('Todo data already exists.');
        }

    } catch(error) {
        console.error('Error initializing data:', error);
    }

}

export { getUserData, getTodoData };