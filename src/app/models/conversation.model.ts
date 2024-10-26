export interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: number;
  userName: string;
  messages: Message[];
}
