import aboutUsImg from "../../../../assets/images/aboutUsImg.webp";

const GetAboutUsContainer = () => {
    return (
        <div className="py-16 px-4 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <img
                                src={aboutUsImg}
                                alt="About Us - EVENTLY Events"
                                className="relative w-full max-w-lg h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-bold text-[#06B6D1] leading-tight">
                                About <span className="text-gray-800">US</span>
                            </h1>
                            <div className="w-20 h-1 bg-gradient-to-r from-[#06B6D1] to-cyan-400 rounded-full"></div>
                        </div>

                        <p className="text-gray-700 text-lg leading-relaxed">
                            At <span className="font-semibold text-[#06B6D1]">EVENTLY Events</span>, we believe every moment deserves to be celebrated in style. Our platform makes it simple to plan, manage, and enjoy events with ease — whether it's a small gathering or a large-scale celebration. With a focus on creativity, organization, and a seamless user experience, we bring people together through unforgettable experiences.
                        </p>

                        <p className="text-gray-600 text-base leading-relaxed">
                            Our mission is to turn your vision into reality, ensuring every detail is taken care of so you can focus on what truly matters: creating memories.
                        </p>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                With Evently you can:
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { icon: "🎯", text: "Find events tailored to your interests" },
                                    { icon: "⚡", text: "Register in seconds" },
                                    { icon: "🔔", text: "Stay updated with real-time notifications" },
                                    { icon: "🤝", text: "Connect with like-minded people" }
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                                        <span className="text-2xl">{feature.icon}</span>
                                        <span className="text-gray-700 font-medium">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="group relative bg-[#06B6D1] text-white font-semibold py-4 px-8 rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#0891b2] hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-cyan-200">
                                <span className="relative z-10">Read More</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetAboutUsContainer;