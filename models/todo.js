import { DataTypes, Model } from "sequelize";
import Sqlize from "../config/sequelize.js";

class Todo extends Model {}
await Todo.init({
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    // user_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    sequelize: Sqlize, modelName: 'Todo', tableName: 'Todo'
});

export default Todo;