import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { Chat } from "./components/chat/chat";
import { Controls } from "./components/Control/Control";
import styles from "./App.module.css";
import { Loader } from "./components/Loader/Loader";

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,});


function App() {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  function addMessage(message) {
    setMessages((prev) => [...prev, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);

    try {
      let currentChat = chat;

      if (!currentChat) {
        const history = messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        }));
        currentChat = ai.chats.create({
          model: "gemini-2.0-flash",
          history: [...history, { role: "user", parts: [{ text: content }] }],
        });
        setChat(currentChat);
      }

      // Send the user message
      const response = await currentChat.sendMessage({ message: content });

      addMessage({ content: response.text, role: "model" });
    } catch (error) {
      console.error("Error:", error);
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.App}>
      {isLoading && <Loader/> }
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chatbot.png" alt="logo" />
        <h2 className={styles.Title}>AI Chatbot</h2>

      </header>

      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>

      <Controls isDisable={isLoading} onSend={handleContentSend} />
    </div>
  );
}

export default App;
