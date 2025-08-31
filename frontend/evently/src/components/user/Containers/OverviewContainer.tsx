import EventGallery from "./EventGallery";

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

            <EventGallery />
        </div>
    );
};

export default OverviewContainer;