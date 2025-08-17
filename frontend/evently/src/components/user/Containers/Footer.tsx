import { FaFacebookF, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {

    return (
        <footer className="relative bg-gray-900 text-white">
            <div className="px-4 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-[#06B6D1] mb-4">EVENTLY</h2>
                                <p className="text-gray-300 leading-relaxed">
                                    Making every event memorable. We bring people together through
                                    unforgettable experiences and seamless event management.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                                <div className="flex space-x-4">
                                    {[
                                        { icon: FaFacebookF, href: "#", color: "hover:text-blue-500" },
                                        { icon: FaTwitter, href: "#", color: "hover:text-blue-400" },
                                        { icon: FaLinkedinIn, href: "#", color: "hover:text-blue-600" },
                                    ].map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                                        >
                                            <social.icon className="text-sm" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold">Quick Links</h4>
                            <div className="space-y-3">
                                {[
                                    "Home", "Events", "About Us", "Contact", "FAQ"
                                ].map((link, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="block text-gray-300 hover:text-[#06B6D1] transition-colors duration-300 hover:translate-x-1 transform"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Services */}
                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold">Our Services</h4>
                            <div className="space-y-3">
                                {[
                                    "Event Planning", "Ticket Booking", "Corporate Events", "Virtual Events", "Event Marketing"
                                ].map((service, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="block text-gray-300 hover:text-[#06B6D1] transition-colors duration-300 hover:translate-x-1 transform"
                                    >
                                        {service}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold">Get In Touch</h4>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <FaMapMarkerAlt className="text-[#06B6D1] mt-1 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">
                                        123 Event Street, Bengaluru, Karnataka, India 560001
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaPhone className="text-[#06B6D1] flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">+91 98765 43210</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaEnvelope className="text-[#06B6D1] flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">hello@evently.com</span>
                                </div>
                            </div>

                            <div>
                                <h5 className="font-semibold mb-3">Subscribe Newsletter</h5>
                                <form className="space-y-3">
                                    <input
                                        type="email"
                                        onChange={(e) => (e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-[#06B6D1] focus:outline-none text-white placeholder-gray-400"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-[#06B6D1] text-white py-3 rounded-lg font-semibold hover:bg-[#0891b2] transition-colors duration-300"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © 2025 Evently. All rights reserved.
                        </div>

                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-[#06B6D1] transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#06B6D1] transition-colors duration-300">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#06B6D1] transition-colors duration-300">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;