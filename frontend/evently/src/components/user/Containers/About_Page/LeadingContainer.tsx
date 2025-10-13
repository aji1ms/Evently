import { AboutImg3 } from "../../../../../utils/Constants";

const LeadingContainer = () => {
    return (
        <div className="py-16 px-4 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <img
                                src={AboutImg3}
                                alt="About Us - EVENTLY Events"
                                className="relative w-full max-w-lg h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                                Leading Online Tech Event Booking Platfrom
                            </h1>
                            <div className="w-20 h-1 bg-gradient-to-r from-[#06B6D1] to-cyan-400 rounded-full"></div>
                        </div>

                        <p className="text-gray-700 text-lg leading-relaxed">
                            <span className="font-semibold text-[#06B6D1]">EVENTLY </span>make discovering, booking, and managing tech events simple and seamless. From hackathons to conferences, workshops to webinars — our platform connects innovators, learners, and leaders with the events that shape the future of technology. With an easy-to-use interface, secure booking, and curated listings, we’re here to ensure you never miss an opportunity to learn, network, and grow
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeadingContainer;
