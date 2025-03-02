// const { GoogleGenerativeAI } = require("@google/generative-ai");
import * as dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI,HarmBlockThreshold, HarmCategory  } from '@google/generative-ai';

const { setGlobalDispatcher, ProxyAgent } = require("undici");
console.log(`HTTPS_PROXY:${process.env.HTTPS_PROXY}`);
const dispatcher = new ProxyAgent({ uri: new URL(process.env.HTTPS_PROXY||'http://127.0.0.1:7890').toString() });
//全局fetch调用启用代理
setGlobalDispatcher(dispatcher);

const fs = require('fs');
const path = require('path');


console.log(`GEMINI_API_KEY:${process.env.GEMINI_API_KEY}`);

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// 模型配置
// 我们也可以根据自己的需求配置模型参数。
// 这些参数值控制模型如何生成响应。
const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
};

// 安全设置
// 我们可以使用安全设置来防止出现有害的响应。 默认情况下，安全设置配置为阻止在各个维度上具有中等到高可能性不安全的内容

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];



// The Gemini 1.5 models are versatile and work with most use cases
// , generationConfig , safetySettings
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});  // 

// 创建对话
export async function generateResponse (prompt:any) {
    console.log(`prompt : ${prompt}`);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text);

    console.log(`Googel Gemini text:${text}`); 

    return text;
  
};

/**
 * 创建图像Prompt
 * @param prompt 
 * @returns 
 */
export async function generateImagesPrompt () {
    // console.log(`prompt : ${prompt}`);
    try {
        const prompt = "Help me infer the prompt of this picture";
        const image = {
            inlineData: {
                data: Buffer.from(fs.readFileSync('src/images/1.jpg')).toString("base64"),
                mimeType: "image/png",
            }, 
        };

        const result = await model.generateContent([prompt, image]);
        console.log(result.response.text());

        return result;

    } catch (error) {
        console.error('推测 Prompt 时出错:', error);
    }
  
};


// export async function extractInformation(text:string) {

//     const prompt2 = `
//     请将以下信息转换为 JSON 格式：
//     姓名：张三
//     年龄：30
//     职业：程序员
//   `;

//   const response = await genAI.generateText({
//     model: 'gemini-pro', // 或其他支持 JSON 输出的模型
//     prompt,
//   });

  
// //   const prompt = await promptTemplate.format({ text });
// //   const response = await model.invoke(prompt);
// //   return response;
// }
