import Message from "./Message";
interface ChatRequestBody {
  currentUserInput: Message;
  conversationHistory: Message[];
}
export default ChatRequestBody;
