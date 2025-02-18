import { Request, Response } from 'express';
import { User } from '../models/user';
import * as langchainService from '../service/langchain';
import * as geminiService from '../service/gemini';

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

// 测试方法
export const ai = async (req: Request, res: Response) => {
    //推理会话：geminiService.generateResponse(req.query.prompt)
    // const result: any = await geminiService.generateResponse(req.query.prompt); // 调用方法

    // //推理图片：geminiService.generateImagesPrompt()
    const result: any = await geminiService.generateImagesPrompt(); // 调用方法

    // 提取json
    // const json = await langchainService.extractInformation(result.response.text());

    res.status(201).json(result);
};
