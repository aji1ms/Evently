import event1Img from "../../../assets/images/events/eventImg.webp";
import event2Img from "../../../assets/images/events/event2Img.webp";
import event3Img from "../../../assets/images/events/event3Img.webp";
import event4Img from "../../../assets/images/events/event4Img.webp";
import event5Img from "../../../assets/images/events/event5Img.webp";
import event6Img from "../../../assets/images/events/event6Img.webp";
import event7Img from "../../../assets/images/events/event7Img.webp";
import event8Img from "../../../assets/images/events/event8Img.webp";

const OverviewContainer = () => {
    const stats = [
        {
            number: "500+",
            label: "Events Hosted",
            icon: "🎉"
        },
        {
            number: "8000+",
            label: "Attendees Connected",
            icon: "👥"
        },
        {
            number: "100+",
            label: "Winners",
            icon: "🏆"
        }
    ];

    const eventImages = [
        { src: event1Img, alt: "Tech Conference 2024" },
        { src: event2Img, alt: "Startup Talks" },
        { src: event3Img, alt: "Business Summit" },
        { src: event4Img, alt: "LinkedIn Webinar" },
        { src: event5Img, alt: "Coding Bootcamp" },
        { src: event6Img, alt: "Job Expos" },
        { src: event7Img, alt: "Innovation Workshop" },
        { src: event8Img, alt: "Networking Event" }
    ];

    return (
        <div className="relative overflow-hidden">
            <div className="relative bg-gradient-to-br from-[#06B6D1] via-[#0891b2] to-[#0e7490] py-20">

                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full blur-lg"></div>
                </div>

                <div className="relative max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our Amazing Journey
                        </h2>
                        <div className="w-24 h-1 bg-white mx-auto rounded-full opacity-80"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                                <div className="relative">
                                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                                        {stat.number}
                                    </h3>
                                    <p className="text-xl text-white/90 font-medium">
                                        {stat.label}
                                    </p>
                                </div>

                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="bg-gradient-to-b from-gray-50 to-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Event <span className="text-[#06B6D1]">Gallery</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#06B6D1] to-cyan-400 mx-auto rounded-full mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Explore the memorable moments from our past events and get inspired for what's coming next
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {eventImages.map((image, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h4 className="text-white font-semibold text-lg mb-1">
                                            {image.alt}
                                        </h4>
                                        <p className="text-white/80 text-sm">
                                            Memorable moments captured
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#06B6D1]/30 rounded-2xl transition-colors duration-300"></div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-16">
                        <button className="group relative px-8 py-4 bg-gradient-to-r from-[#06B6D1] to-[#0891b2] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-200">
                            <span className="relative z-10 flex items-center space-x-2">
                                <span>View All Events</span>
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewContainer;