import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";
import "./utils/index.css";
import ApiKeyPrompt from "./components/ApiKeyPrompt";
import VideoBackground from "./components/VideoBackground";

function App() {
  const [user] = useAuthState(auth);

  const hasApiKey = () => !!localStorage.getItem("gemini_api_key");

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<><Navigation /><Home /></>} />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                {hasApiKey() ? <Chat /> : <Navigate to="/api-key" />}
              </PrivateRoute>
            }
          />
          <Route
            path="/auth"
            element={
              user ? <Navigate to="/api-key" /> :
              <VideoBackground><Navigation /><Login /></VideoBackground>
            }
          />
          <Route
            path="/api-key"
            element={
              <PrivateRoute>
                {hasApiKey() ? <Navigate to="/chat" /> :
                  <VideoBackground><Navigation /><ApiKeyPrompt /></VideoBackground>
                }
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;