import Message from "@/app/interfaces/Message";

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    message: Message;
    index: number;
    logprobs: any; // Replace 'any' with a more specific type if you know the structure
    finish_reason: string;
  }>;
}
export default OpenAIResponse;
