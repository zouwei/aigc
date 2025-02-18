import * as dotenv from 'dotenv';
dotenv.config();
import { z } from "zod";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  StructuredOutputParser,
  OutputFixingParser,
} from "langchain/output_parsers";

const { setGlobalDispatcher, ProxyAgent } = require("undici");
console.log(`HTTPS_PROXY:${process.env.HTTPS_PROXY}`);
const dispatcher = new ProxyAgent({ uri: new URL(process.env.HTTPS_PROXY||'http://127.0.0.1:7890').toString() });
//全局fetch调用启用代理
setGlobalDispatcher(dispatcher);

const fs = require('fs');
const path = require('path');


// 定义输出 Schema
const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      name: z.string().describe("人类的名字"),
      surname: z.string().describe("人类的姓氏"),
      age: z.number().describe("人类的年龄"),
      appearance: z.string().describe("人类的外形描述"),
      shortBio: z.string().describe("简介"),
      university: z.string().optional().describe("就读大学的名称"),
      gender: z.string().describe("人类的性别"),
      interests: z
        .array(z.string())
        .describe("关于人类兴趣的 json 数组"),
    })
);


// Prompt 模版
const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
    template:
      `生成虚拟人物的详细信息.\n{format_instructions}
       人物描述: {description}`,
    inputVariables: ["description"],
    partialVariables: { format_instructions: formatInstructions },
});


const model = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.5, 
    model: "text-davinci-003"
});

/**
 * 提供一个测试AI模型得方法
 * @returns 
 */
export async function testAI(){
  var input =  await prompt.format({
    description: "一个男人，生活在英国",
  });

  var response = await model.call(input);
  
  return response;
}




// // 定义提取信息的提示模板
// const promptTemplate = new PromptTemplate({
  
//   // 从以下文本中提取信息并以 JSON 格式输出：
//   // 文本: {text}
  
//   // 输出格式:
//   template: `
//     {
//         "prompt": "content"
//     }
//   `,
//   inputVariables: ["text"],
// });
// // 提取信息的函数
// export async function extractInformation(text:string) {
//   const prompt = await promptTemplate.format({ text });
//   const response = await model.invoke(prompt);
//   return response;
// }

// /**
//  * 创建图像Prompt
//  * @param prompt 
//  * @returns 
//  */
// export async function generateImagesPrompt () {
//   // console.log(`prompt : ${prompt}`);
//   try {
//       const prompt = "Help me infer the prompt of this picture";
//       const image = {
//           inlineData: {
//               data: Buffer.from(fs.readFileSync('src/images/1.jpg')).toString("base64"),
//               mimeType: "image/png",
//           }, 
//       };

//       const result = await model.generateContent([prompt, image]);
//       console.log(result.response.text());

//       return result;

//   } catch (error) {
//       console.error('推测 Prompt 时出错:', error);
//   }

// };


export function add(a: number, b: number): number {
    return a + b;
  }
  
export function subtract(a: number, b: number): number {
  return a - b;
}