import Footer from "../components/user/Containers/Footer"
import Header from "../components/user/Containers/Header"
import bannerImage from "../assets/images/mainBannerImg.png";
import MessagingSection from "../components/user/Containers/Contact_Page/ContactForm";
import EmailSection from "../components/user/Containers/Contact_Page/CardsSection";

const Contact = () => {
    return (
        <div>
            <Header />
            <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[80vh] overflow-hidden">
                <img
                    src={bannerImage}
                    alt="Event planning and management banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-5xl md:text-7xl text-white font-bold">
                        Contact Us
                    </h1>
                </div>
            </div>
            <EmailSection />
            <MessagingSection />
            <Footer />
        </div>
    )
}

export default Contact
