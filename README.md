<img width="1470" alt="Screenshot 2024-05-28 at 7 36 17 PM" src="https://github.com/V15hnu24/AI-Chat-Bot/assets/75430163/52f3807e-a8c5-4785-8771-1b5aa75acb90">

# AI-Chat-Bot Application

## Description
This project is a chat application built with Next.js and Tailwind CSS. It allows users to engage in conversations with a chatbot, fetching prompts and responses from Google's Gemini API.

## Features
- User-friendly interface
- Real-time chat interaction
- Conversation history display
- Seamless integration with backend API

## Technologies Used
- **Next.js**: Next.js is a React framework that enables server-side rendering, routing, and other powerful features for building web applications.
- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework that allows for rapid styling of components using pre-defined utility classes.
- **React**: React is a JavaScript library for building user interfaces.
- **Node.js**: Node.js is a JavaScript runtime environment that allows for the execution of JavaScript code on the server side.
- **MongoDB**: MongoDB is a NoSQL database used for storing and managing data.

## Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/chat-application.git
   ```
2. **Install dependencies**:
   ```bash
   cd chat-application
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
   This will start the Next.js development server. You can view the application by navigating to `http://localhost:3000` in your web browser.

## Configuration
- The application requires a backend API for fetching chat prompts and responses. Update the API endpoint in the code where necessary (`server/api/thread/${id}` and `server/api/turn/${id}`).
- Ensure MongoDB is properly configured and accessible by the backend server.
