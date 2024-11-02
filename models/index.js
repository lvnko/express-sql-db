import Todo from "./todo.js";
import User from "./user.js";

User.hasMany(Todo, { onDelete: 'cascade' });
Todo.belongsTo(User);

export { Todo, User };