import express from "express";
import { User, Todo } from "../models/index.js";
import { standardErrorHandler, customErrorHandler, customFaultHandler, verifyData } from "../utilities/index.js";

const Router = express.Router();

// 取得所有的 Todo taskes
Router.get('/', async (req, res)=>{
    
    try {
        const results = await Todo.findAll({
            include: {
                model: User
            }
        });
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(results));
        res.end();
    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

// 取得某個 Todo task detail
Router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const result = await Todo.findByPk(id, {
            include: {
                model: User
            }
        });
        if (!result) return customErrorHandler(res, "Todo task cannot be found.");
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(result));
        res.end();

    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

// 更新某個 Todo task detail
Router.put('/:id', async (req, res) => {

    const verification = verifyData({
        ...(req.body.title? {title: req.body.title} : null),
        ...(req.body.description? {description: req.body.description} : null),
        ...(req.body.userId? {UserId: req.body.userId} : null),
    }, 'update todo task');

    if (!verification.valid) return customFaultHandler(res, verification.result);
    const data = verification.result;
    const id = req.params.id;
    
    try {

        const [update] = await Todo.update(data, {
            where: { id: id  }
        });
        if (!update) customErrorHandler(res, "Todo task cannot be found.");

        const result = await Todo.findByPk(id, {
            include: {
                model: User
            }
        });
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(result.toJSON()));
        res.end();

    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

// 刪除某個 Todo task
Router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const result = await Todo.destroy({ where: { id: id }});
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({
            statusText: "ok",
            message: `${result} record${result > 1 ? 's are':' is'} deleted from table Todo.`
        }));
        res.end();

    } catch(error) {
        return standardErrorHandler(res, error);
    }

});

export default Router;