import { DataTypes, Model } from "sequelize";
import Sqlize from "../config/sequelize.js";

class User extends Model {}
await User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true },
    given_name: { type: DataTypes.STRING, allowNull: false },
    family_name: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize: Sqlize, modelName: 'User', tableName: 'User'
});

export default User;