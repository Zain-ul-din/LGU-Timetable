import { ChatGPTAPI } from 'chatgpt';

export const chatGPT = new ChatGPTAPI({
   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string
});
