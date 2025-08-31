import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import GPT from "./pages/GPT";
import Notifications from "./pages/Notifications";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User */}
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gpt" element={<GPT />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        {/* Admin */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
