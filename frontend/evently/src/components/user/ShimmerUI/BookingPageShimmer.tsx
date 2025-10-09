import Footer from "../Containers/Footer"
import Header from "../Containers/Header"

const BookingPageShimmer = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="bg-gray-700 relative w-full h-[18vh] sm:h-[20vh] md:h-[20vh] lg:h-[20vh] overflow-hidden" />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                            <div className="w-full h-48 bg-gray-300"></div>
                            <div className="p-6 space-y-4">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-300 rounded w-full"></div>
                                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-gray-300 rounded w-32"></div>
                                    <div className="h-3 bg-gray-300 rounded w-28"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BookingPageShimmer
