import { reviewImg } from "../../../../../utils/Constants"

const ClientsContainer = () => {
    return (
        <div className="py-16 px-4 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Image Section */}
                    <div className="hidden lg:flex w-full lg:w-1/2 justify-center">
                        <div className="relative group">
                            <img
                                src={reviewImg}
                                alt="review-img - EVENTLY Events"
                                className="relative w-full max-w-lg h-auto rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                                What Our Clients Are Saying About
                            </h1>
                            <div className="w-20 h-1 bg-gradient-to-r from-[#06B6D1] to-cyan-400 rounded-full"></div>
                        </div>
                        <div className="border border-black p-4 rounded-2xl">
                            <div className="flex items-center">
                                <div className="flex flex-col ml-4">
                                    <h1 className="font-bold text-xl">John Doe</h1>
                                    <p className="text-gray-500">Web Developer</p>
                                </div>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed mt-3">
                                It was glad to be associated with Evently for all our Virtual Events & Webinar requirements.
                                It was a hassle free experience and would recommend others as well.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientsContainer
