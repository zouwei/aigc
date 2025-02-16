"use strict";
// import * as dotenv from 'dotenv';
// dotenv.config();
// import { z } from "zod";
// import { OpenAI } from "langchain";
// import { PromptTemplate } from "langchain";
// import {
//   StructuredOutputParser,
//   OutputFixingParser,
// } from "langchain/output_parsers";
// (async() => {
// // 定义输出 Schema
// const parser = StructuredOutputParser.fromZodSchema(
//     z.object({
//       name: z.string().describe("人类的名字"),
//       surname: z.string().describe("人类的姓氏"),
//       age: z.number().describe("人类的年龄"),
//       appearance: z.string().describe("人类的外形描述"),
//       shortBio: z.string().describe("简介"),
//       university: z.string().optional().describe("就读大学的名称"),
//       gender: z.string().describe("人类的性别"),
//       interests: z
//         .array(z.string())
//         .describe("关于人类兴趣的 json 数组"),
//     })
// );
// // Prompt 模版
// const formatInstructions = parser.getFormatInstructions();
// const prompt = new PromptTemplate({
//     template:
//       `生成虚拟人物的详细信息.\n{format_instructions}
//        人物描述: {description}`,
//     inputVariables: ["description"],
//     partialVariables: { format_instructions: formatInstructions },
// });
// const model = new OpenAI({ 
//     openAIApiKey: process.env.OPENAI_API_KEY,
//     temperature: 0.5, 
//     model: "gpt-3.5-turbo"
// });
// exports.
// prompt.format({
//  description: "一个男人，生活在英国",
// }).then(input=>{
//     return odel.call(input);
// }).then(response=>{
//     console.log('生成的结果：', response)
// });
// })();
//# sourceMappingURL=langchain.js.map