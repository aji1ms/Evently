import { FiMail } from 'react-icons/fi';
import { FaPhone } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';

const EmailSection = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6 p-6  mx-auto">
            {/* Email Card */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-8 text-white flex-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-lg p-4">
                        <FiMail size={40} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">hello@evently.com</h3>
                    <p className="text-blue-100 text-md">
                        Email us anytime for any kind of query.
                    </p>
                </div>
            </div>

            {/* Phone Card */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-8 text-white flex-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-lg p-4">
                        <FaPhone size={40} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Hot: +91 98765 43210</h3>
                    <p className="text-blue-100 text-md">
                        Call us any kind support, we will wait for it.
                    </p>
                </div>
            </div>

            {/* Address Card */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-8 text-white flex-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-lg p-4">
                        <FaLocationDot size={40} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Event Street, Bengaluru, Karnataka, India 560001</h3>
                    <p className="text-blue-100 text-md">
                        Any kind of enquiry reach out us
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EmailSection;