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
import EventDetails from "./pages/EventDetails";
import BookMark from "./pages/BookMark";
import Tickets from "./pages/Tickets";
import RatingPage from "./pages/RatingPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User */}
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bookmarks" element={<BookMark />} />
          <Route path="/gpt" element={<GPT />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/rateus" element={<RatingPage />} />
        </Route>
        {/* Admin */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
