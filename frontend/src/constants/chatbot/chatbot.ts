import type { ChatMessage } from "@/types";

export const BOT_RESPONSES = [
  "Hello! How can I help you today?",
  "I'm here to assist you with any questions about FinHub.",
  "What would you like to know?",
  "Feel free to ask me anything about our services!",
  "I'm available 24/7 to help you out.",
  "Is there anything specific I can help you with?",
];

export const INITIAL_CHAT_MESSAGE: Omit<ChatMessage, "timestamp"> = {
  id: "1",
  text: "Hi! Welcome to FinHub Support. How can I help you today?",
  sender: "bot",
};

export const CHATBOT_UI_TEXT = {
  HEADER_TITLE: "FinHub Support",
  HEADER_STATUS: "Online",
  INPUT_PLACEHOLDER: "Type a message...",
};
