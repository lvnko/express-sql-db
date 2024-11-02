import express from "express";
import { User, Todo } from "../models/index.js";
import { standardErrorHandler, customErrorHandler, customFaultHandler, verifyData } from "../utilities/index.js";
import TodoRouter from "./todo.js";

const Router = express.Router();

Router.use('/todo', TodoRouter);

// 新增 User
Router.post('/', async (req, res) => {

    const verification = verifyData({
        id: req.body.id,
        given_name: req.body.givenName,
        ...(req.body.familyName? {family_name: req.body.familyName} : null),
        gender: req.body.gender,
        email: req.body.email
    }, 'insert user');

    if (!verification.valid) return customFaultHandler(res, verification.result);
    const data = verification.result;

    try {
        const result = await User.create(data);
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(result.toJSON()));
        res.end();
    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

// 新增 Todo Task
Router.post('/:id/todo', async (req, res) => {

    const verification = verifyData({
        id: req.body.id,
        title: req.body.title,
        ...(req.body.description? {description: req.body.description} : null),
        UserId: req.params.id
    }, 'insert todo task');

    if (!verification.valid) return customFaultHandler(res, verification.result);
    const data = verification.result;

    try {
        const result = await Todo.create(data);
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(result.toJSON()));
        res.end();
    } catch(error) {
        return standardErrorHandler(res, error);
    }
});

// 取得所有 Users
Router.get('/', async (req, res)=> {

    try {
        const results = await User.findAll();
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(results));
        res.end();
    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

// 取得某個 User detail
Router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const result = await User.findByPk(id);
        if (!result) return customErrorHandler(res, "User cannot be found.");
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(result));
        res.end();
    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

// 取得某個 User:id 的 detail 及其所有的 Todo taskes
Router.get('/:id/todos', async (req, res)=> {
    
    const id = req.params.id;
    console.log('Did  it fire?');

    try {
        const result = await User.findByPk(id, {
            include: [
                { model: Todo }
            ]
        });
        if (!result) return customErrorHandler(res, "User cannot be found.");
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(result));
        res.end();
    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

// 更新某個 User detail
Router.put('/:id', async (req, res) => {

    const verification = verifyData({
        ...(req.body.givenName? {given_name: req.body.givenName} : null),
        ...(req.body.familyName? {family_name: req.body.familyName} : null),
        ...(req.body.gender? {gender: req.body.gender} : null),
        ...(req.body.email? {email: req.body.email} : null),
    }, 'update todo task');

    if (!verification.valid) return customFaultHandler(res, verification.result);
    const data = verification.result;
    const id = req.params.id;
    
    try {

        const target = await User.findByPk(id);
        const result = await target.update(data);
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(result.toJSON()));
        res.end();

    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

// 刪除某個 User
Router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const result = await User.destroy({ where: { id: id }});
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({
            statusText: "ok",
            message: `${result} record${result > 1 ? 's are':' is'} deleted from table User.`
        }));
        res.end();

    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

export default Router;