import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function askGemini(prompt: string) {
  const client = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY as string);
  const model = client.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const res = result.response.text();
  return res;
}
