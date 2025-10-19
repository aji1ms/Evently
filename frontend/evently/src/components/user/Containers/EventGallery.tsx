import { useNavigate } from "react-router";
import { eventImages } from "../../../../utils/Constants";

const EventGallery = () => {
    const navigate = useNavigate();

    return (
        <div>
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
                        <button className="group relative px-8 py-4 bg-gradient-to-r from-[#06B6D1] to-[#0891b2] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-200 cursor-pointer"
                            onClick={() => navigate("/events")}
                        >
                            <span className="relative z-10 flex items-center space-x-2">
                                <span>View All Events</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventGallery;
