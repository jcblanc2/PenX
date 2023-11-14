import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./UserContext";
import Create from './pages/Create';
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <div className="app">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App;