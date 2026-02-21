import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/User/Home";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Events from "./pages/User/Events";
import EventDetails from "./pages/User/EventDetails";
import About from "./pages/User/About";
import Contact from "./pages/User/Contact";
import BookMark from "./pages/User/BookMark";
import Chat from "./pages/User/Chat";
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
import AddEvents from "./pages/Admin/AddEvents";
import AdminLogin from "./pages/Admin/AdminLogin";
import CheckoutPage from "./pages/User/CheckoutPage";
import Category from "./pages/Admin/Category";
import { Toaster } from 'react-hot-toast';
import { fetchUser } from "./Redux/slices/auth/authSlice";
import { fetchAdmin } from "./Redux/slices/admin/adminAuthSlice";
import type { AppDispatch } from "./Redux/store";
import AdminProtectedRoute from "./helper/AdminProtectedRoute";
import UserProtectedRoutes from "./helper/UserProtectedRoutes";
import TicketDetails from "./pages/User/TicketDetails";
import BookingDetails from "./components/admin/Containers/Booking_Management/BookingDetails";
import ScrollToTop from "./helper/ScrollToTop";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAdmin());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop />
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
          <Route element={<UserProtectedRoutes />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/notification-center" element={<NotificationCenter />} />
            <Route path="/bookmarks" element={<BookMark />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/ticket/:id" element={<TicketDetails />} />
            <Route path="/rateus" element={<RatingPage />} />
          </Route>
        </Route>
        {/* Admin */}
        <Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/events" element={<EventList />} />
            <Route path="/admin/addEvents" element={<AddEvents />} />
            <Route path="/admin/bookings" element={<Bookings />} />
            <Route path="/admin/booking/:id" element={<BookingDetails />} />
            <Route path="/admin/notifications" element={<Notifications />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;