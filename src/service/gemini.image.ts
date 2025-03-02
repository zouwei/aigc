import { VertexAI,GenerateContentRequest,GenerateContentResult} from '@google-cloud/vertexai';
import { GoogleGenerativeAI,HarmBlockThreshold, HarmCategory  } from '@google/generative-ai';
import * as fs from "fs"
import * as path from 'path'
// 环境配置
import * as dotenv from 'dotenv';
dotenv.config();
// 系统代理
const { setGlobalDispatcher, ProxyAgent } = require("undici");
console.log(`HTTPS_PROXY:${process.env.HTTPS_PROXY}`);
const dispatcher = new ProxyAgent({ uri: new URL(process.env.HTTPS_PROXY||'http://127.0.0.1:7890').toString() });
//全局fetch调用启用代理
setGlobalDispatcher(dispatcher);


const PRODUCTID = '78679854628';
const LOCATION = 'asia-east1'; // asia-east1（台湾）、asia-northeast1（日本）、asia-southeast1（新加坡）

/**
 * 创建图像
 * @param projectId 
 * @param location 
 * @param prompt 
 */
export async function generateImagesPrompt(prompt: string ) {
  const vertexAI = new VertexAI({ project: PRODUCTID, location: LOCATION });
  const model = vertexAI.getGenerativeModel({
      model: 'gemini-pro-vision', // 如果想输入图片，需要使用gemini-pro-vision
  });

  const request = {
      contents: [{ parts: [{ text: prompt }] }],
  } as GenerateContentRequest;

  const response = await model.generateContent(request) as GenerateContentResult;
  if (!response || !response.response|| !response.response.candidates) throw new Error('Browser or Page not initialized');
  const image = await response.response.candidates[0].content.parts[0];
  console.log(JSON.stringify(image,null,4));
}




// // console.log(`GEMINI_API_KEY:${process.env.GEMINI_API_KEY}`);

// // 以环境变量形式访问您的 API 密钥（请参阅上面的“设置您的 API 密钥”）
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");


// // 将本地文件信息转换为 GoogleGenerativeAI.Part 对象。
// function fileToGenerativePart(path:string, mimeType:string) {
//     return {
//       inlineData: {
//         data: Buffer.from(fs.readFileSync(path)).toString("base64"),
//         mimeType
//       },
//     };
//   }

// /**
//  * AIGC创建图像
//  * @param prompt 提示词
//  */
// export async function generateImagesPrompt(prompt:string) {
//     // Gemini 1.5 型号功能多样，既可处理纯文本提示，也可处理多模式提示
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
//     // const prompt = "What's different between these pictures?";
  
//     // const imageParts = [
//     //   fileToGenerativePart("image1.png", "image/png"),
//     //   fileToGenerativePart("image2.jpeg", "image/jpeg"),
//     // ];
  
//     const result = await model.generateContent([prompt]);  // , ...imageParts
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//   }

  



  
