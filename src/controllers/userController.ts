import { Request, Response } from 'express';
import { User } from '../models/user';

let users: User[] = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
];

export const getUsers = (req: Request, res: Response) => {
    res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
};

export const createUser = (req: Request, res: Response) => {
    const newUser: User = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age,
    };
    users.push(newUser);
    res.status(201).json(newUser);
};
