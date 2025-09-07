import { Link } from "react-router";
import { IoIosNotifications, IoIosMenu, IoIosClose } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { AiFillOpenAI } from "react-icons/ai";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/events", label: "Events" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" }
    ];

    return (
        <header className="absolute top-5 left-0 w-full px-4 sm:px-8 py-4 z-50">
            <div className="flex justify-between items-center">
                <Link to="/">
                    <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
                        EVENTLY
                    </h1>
                </Link>

                <nav className="hidden lg:flex bg-gray-400/45 h-16 px-6 items-center rounded-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="mx-3 text-xl font-medium text-white hover:text-[#06B6D1] transition-colors duration-300"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* mobile menu button */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden p-2 text-white"
                >
                    {isMenuOpen ? <IoIosClose size={32} /> : <IoIosMenu size={32} />}
                </button>

                <div className="hidden lg:flex items-center">
                    <Link to="/notifications">
                        <IoIosNotifications size={40} className="mr-3 text-yellow-500 hover:scale-110 transition-transform duration-300" />
                    </Link>
                    <Link to="/bookmarks">
                        <FaBookmark size={30} className="mr-3 text-red-500 hover:scale-110 transition-transform duration-300" />
                    </Link>
                    <Link to="/gpt">
                        <AiFillOpenAI size={40} className="mr-3 text-white hover:scale-110 transition-transform duration-300" />
                    </Link>
                    <Link to="/profile">
                        <IoSettingsOutline size={40} className="mr-3 text-white hover:scale-110 transition-transform duration-300" />
                    </Link>
                </div>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-xl">
                    <nav className="space-y-2 mb-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="block text-white text-lg font-medium py-3 px-4 rounded-xl hover:bg-white/10 transition-colors duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="border-t border-white/20 pt-6">
                        <div className="grid grid-cols-2 gap-3">
                            <Link to="/notifications" className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                                <IoIosNotifications size={24} className="text-yellow-500" />
                                <span className="text-white">Notifications</span>
                            </Link>
                            <Link to="/bookmarks" className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                                <FaBookmark size={20} className="text-red-500" />
                                <span className="text-white">Bookmarks</span>
                            </Link>
                            <Link to="/gpt" className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                                <AiFillOpenAI size={24} className="text-white" />
                                <span className="text-white">AI Assistant</span>
                            </Link>
                            <Link to="/profile" className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                                <IoSettingsOutline size={24} className="text-white" />
                                <span className="text-white">Settings</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

        </header>
    );
};

export default Header;