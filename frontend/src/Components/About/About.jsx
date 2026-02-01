import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-fuchsia-50 p-8">
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-2xl">
                <h1 className="text-4xl font-black text-gray-800 mb-6 border-b-4 border-green-600 pb-2 w-fit">
                    About Our <span className="text-green-600">Taxi Service</span>
                </h1>

                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                    <p>
                        Welcome to <span className="font-bold text-green-600">Taxi Booking</span>, your premier Choice for reliable and affordable transportation across Tamil Nadu. We pride ourselves on providing top-notch taxi services tailored to your specific needs, whether it's a quick trip across town or a long-distance journey.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 my-10">
                        <div className="bg-green-50 p-6 rounded-2xl border-l-8 border-green-600">
                            <h3 className="text-xl font-bold text-green-800 mb-2">Our Mission</h3>
                            <p className="text-sm">To provide safe, reliable, and transparent taxi services that connect people and places with comfort and ease.</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-2xl border-l-8 border-blue-600">
                            <h3 className="text-xl font-bold text-blue-800 mb-2">Our Vision</h3>
                            <p className="text-sm">To be the most trusted taxi booking platform in the region, known for our integrity and customer-centric approach.</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8">Why Choose Us?</h2>
                    <ul className="list-disc list-inside space-y-3 ml-4">
                        <li><span className="font-bold">Transparent Pricing:</span> No hidden charges, pay what you see.</li>
                        <li><span className="font-bold">24/7 Availability:</span> We are always ready to serve you, anytime, anywhere.</li>
                        <li><span className="font-bold">Professional Drivers:</span> Skilled and courteous drivers for a safe journey.</li>
                        <li><span className="font-bold">Well-Maintained Fleet:</span> Clean and comfortable vehicles for all trip types.</li>
                    </ul>

                    <div className="mt-12 p-8 bg-gray-100 rounded-3xl text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to ride?</h3>
                        <p className="mb-6 italic"> Experience the best taxi service in Tamil Nadu today.</p>
                        <a href="/booking" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-lg">
                            Book Your Cab Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
