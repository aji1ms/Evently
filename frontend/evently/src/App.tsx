import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/User/Home";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Events from "./pages/User/Events";
import EventDetails from "./pages/User/EventDetails";
import About from "./pages/User/About";
import Contact from "./pages/User/Contact";
import BookMark from "./pages/User/BookMark";
import GPT from "./pages/User/GPT";
import Profile from "./pages/User/Profile";
import Tickets from "./pages/User/Tickets";
import RatingPage from "./pages/User/RatingPage";
import Admin from "./pages/Admin/Admin";
import Users from "./pages/Admin/Users";
import EventList from "./pages/Admin/EventLists";
import Reviews from "./pages/Admin/ReviewList";
import Bookings from "./pages/Admin/Bookings";
import NotificationCenter from "./pages/User/NotificationCenter";
import Notifications from "./pages/Admin/Notifications";
import Reports from "./pages/Admin/Reports";

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
          <Route path="/notification-center" element={<NotificationCenter />} />
          <Route path="/bookmarks" element={<BookMark />} />
          <Route path="/gpt" element={<GPT />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/rateus" element={<RatingPage />} />
        </Route>
        {/* Admin */}
        <Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/events" element={<EventList />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
