# AI Chat Assistant

A web-based AI-powered programming assistant that helps users with coding questions, powered by **Google Gemini API**, **Firebase Authentication**, and **Firestore Database**. This app allows users to chat with an AI assistant in real-time and store their chat history securely.

---

## Features

- **User Authentication:** Sign up and log in using Email/Password or Google account (via Firebase Auth).  
- **Real-time Chat:** Messages are stored in Firestore and updated instantly.  
- **AI Assistant:** Powered by Google Gemini API, provides programming help with code examples.  
- **User-specific Chat History:** Each user's messages are private and secured.  
- **Markdown Support:** Responses can display code blocks and formatted text using React Markdown.  
- **Responsive & Modern UI:** Clean design with Tailwind CSS and animations.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router  
- **Backend:** Firebase (Auth + Firestore)  
- **AI:** Google Gemini API  
- **State Management:** React Hooks (`useState`, `useEffect`)  
- **Syntax Highlighting:** `react-syntax-highlighter`

---



## Getting Started

### Prerequisites

- Node.js >= 16
- NPM or Yarn
- Firebase account
- Google AI Studio account for Gemini API

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TejaNaik15/ChatMentorAI.git
   cd ChatMentorAI
