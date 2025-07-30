import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex flex-col items-center py-12 px-4 animate-fadeIn">
            {/* Hero Section */}
            <div className="w-full max-w-3xl text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-slideDown">About Us</h1>
                <p className="text-lg md:text-xl text-gray-600 animate-fadeIn delay-200">Welcome to our e-commerce platform! We are passionate about delivering quality, trust, and style to your doorstep.</p>
            </div>

            {/* Brand Story Card */}
            <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-yellow-100 animate-scaleIn">
                <h2 className="text-2xl font-bold text-yellow-700 mb-3">Our Story</h2>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                    Founded in 2025, our mission is to make fashion accessible, affordable, and enjoyable for everyone. We believe in quality products, fast delivery, and customer satisfaction above all else. Our team works tirelessly to curate the best collections and ensure a seamless shopping experience.
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                    Thank you for being a part of our journey. We look forward to serving you and making every purchase memorable!
                </p>
            </div>

            {/* Highlights Section */}
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:scale-105 animate-fadeInUp">
                    <span className="text-yellow-500 text-4xl mb-2 animate-bounce">★</span>
                    <h3 className="font-semibold text-lg mb-1">Trusted by Thousands</h3>
                    <p className="text-gray-500 text-sm text-center">Our customers love us for our reliability and service.</p>
                </div>
                <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:scale-105 animate-fadeInUp delay-100">
                    <span className="text-green-500 text-4xl mb-2 animate-pulse">✔</span>
                    <h3 className="font-semibold text-lg mb-1">Quality Guaranteed</h3>
                    <p className="text-gray-500 text-sm text-center">We offer only the best, handpicked products for you.</p>
                </div>
                <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:scale-105 animate-fadeInUp delay-200">
                    <span className="text-blue-500 text-4xl mb-2 animate-spin-slow">💬</span>
                    <h3 className="font-semibold text-lg mb-1">24/7 Support</h3>
                    <p className="text-gray-500 text-sm text-center">Our team is always here to help you with any queries.</p>
                </div>
            </div>
        </div>
    );
}

export default About;
