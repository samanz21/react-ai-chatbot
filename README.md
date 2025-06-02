# AI Chatbot using React and Gemini-2.0-Flash

This project is a simple AI chatbot built with **React** and Google’s **Gemini-2.0-Flash** model via the **@google/genai** SDK. It allows users to interact with an AI model in real-time.

## 🚀 Features
- Interactive chat interface with message history
- Real-time responses using Gemini-2.0-Flash
- React-based with modular components
- Loading indicators for smooth UX
- Error handling for failed requests

## 🛠️ Technologies Used
- **React** (Vite)
- **Google GenAI** SDK (`@google/genai`)
- **CSS Modules** for styling

## 🔑 Setup Instructions

### 1. Clone the Repository
git clone https://github.com/your-username/ai-chatbot-react.git
cd ai-chatbot-react

### 2. Install Dependencies
npm install

### 3. Create Environment Variable File
Create a .env file in the root directory and add your Google AI API key:
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here

### 4. Run the Development Server
npm run dev

### 5. Open in Browser
Visit http://localhost:5173 to use the chatbot.

💡 How It Works
The app initializes a GoogleGenAI instance with your API key.

Messages are stored in the messages state and displayed in the chat window.

On sending a message, it checks if a chat session exists. If not, it creates one with the user’s history.

The AI’s response is fetched and added to the messages.

A loader is displayed during API calls, and error handling is in place.
