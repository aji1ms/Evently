import discountImg from "../../../assets/images/discountImg.webp";

const DiscountPoster = () => {
    return (
        <div className="px-4 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden bg-gradient-to-r from-[#06B6D1] to-[#0891b2] rounded-2xl shadow-xl">

                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                    </div>

                    <div className="relative flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12 gap-8">

                        <div className="flex-1 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full">
                                <span className="text-white font-medium text-sm uppercase tracking-wide">
                                    Special Offer for You
                                </span>
                            </div>

                            {/* main heading */}
                            <div className="space-y-3">
                                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                                    <span className="text-yellow-300 text-5xl lg:text-6xl font-black">20%</span>
                                    <span className="block">Off Your First Ticket</span>
                                </h1>
                            </div>

                            <p className="text-white/90 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                                Plan it. Share it. Celebrate it.
                                <span className="font-semibold"> Evently</span> makes
                                every event simple and special
                            </p>

                            <div className="pt-2">
                                <button className="bg-white text-[#06B6D1] font-bold text-lg px-8 py-3 rounded-xl hover:bg-yellow-50 hover:scale-105 transition-all duration-300 shadow-lg">
                                    Grab It Now
                                </button>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start space-x-2 text-white/80">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">Limited time offer</span>
                            </div>
                        </div>

                        {/* image section */}
                        <div className="flex-shrink-0 relative">
                            <div className="relative">
                                <img
                                    src={discountImg}
                                    alt="Special discount offer for event tickets"
                                    className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: "🎟️", title: "Easy Booking", desc: "Book tickets in just a few clicks" },
                        { icon: "💳", title: "Secure Payment", desc: "100% secure payment processing" },
                        { icon: "📱", title: "Mobile Friendly", desc: "Access from any device, anywhere" }
                    ].map((feature, index) => (
                        <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="text-3xl mb-3">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiscountPoster;