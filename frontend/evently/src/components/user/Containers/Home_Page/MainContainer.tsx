import { useNavigate } from "react-router";
import { bannerImg } from "../../../../../utils/Constants";

const MainContainer = () => {
    const navigate = useNavigate();

    return (
        <div className="relative px-4 py-5">

            <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden rounded-2xl lg:rounded-4xl">
                <img
                    src={bannerImg}
                    alt="Event planning and management banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-16">

                <div className="mb-8 sm:mb-12 lg:mb-16">
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight max-w-full sm:max-w-4xl lg:max-w-5xl">
                        Your smart way to
                        <span className="text-[#06B6D1] block sm:inline sm:ml-2">plan, manage,</span>
                        <span className="block">and enjoy unforgettable events</span>
                        <span className="text-[#06B6D1]"> — all in one place.</span>
                    </h1>

                    <p className="hidden md:block text-white/90 text-lg lg:text-xl mt-4 max-w-2xl">
                        Discover, create, and manage events with ease. Join thousands of event organizers
                        who trust Evently for their most important moments.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <button
                        className="group relative bg-white text-gray-900 font-semibold text-lg sm:text-xl py-4 px-8 sm:px-10 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30"
                        onClick={() => navigate("/events")}
                    >
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                            <span>Explore Events</span>
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D1] to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>

                <div className="hidden lg:flex items-center space-x-8 mt-8 text-white/80">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#06B6D1] rounded-full animate-pulse"></div>
                        <span className="text-sm">500+ Events Hosted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#06B6D1] rounded-full animate-pulse"></div>
                        <span className="text-sm">8000+ Happy Attendees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#06B6D1] rounded-full animate-pulse"></div>
                        <span className="text-sm">100+ Winners</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContainer;