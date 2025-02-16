"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getUsers = void 0;
let users = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
];
const getUsers = (req, res) => {
    res.json(users);
};
exports.getUsers = getUsers;
const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send('User not found');
    }
};
exports.getUserById = getUserById;
const createUser = (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age,
    };
    users.push(newUser);
    res.status(201).json(newUser);
};
exports.createUser = createUser;
//# sourceMappingURL=userController.js.map