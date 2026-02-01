import React from "react";
import { PiMapPinSimpleFill } from "react-icons/pi";
import taxiLocal from "../../assets/images/taxiLocal.jpg";

const Service = () => {
  return (
    <>
      <section className="bg-fuchsia-100 p-[20px]  ">
        <h1 className="text-4xl font-bold text-center">Our Services</h1>

        <section className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 max-w-4xl lg:mx-auto my-8 w-full p-[10px] text-center gap-8">
          {/* one way trip */}
          <div className="bg-white rounded-2xl w-full text-center lg:mx-auto p-8 shadow-xl hover:scale-105 transition-transform duration-300 border-b-4 border-green-600">
            <div className="w-[120px] h-[120px] mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <PiMapPinSimpleFill className="text-6xl text-green-600" />
            </div>

            <h3 className="text-center text-2xl font-bold capitalize text-gray-800 mb-4">
              One Way Trip
            </h3>
            <p className="text-center text-gray-600 font-medium leading-relaxed">
              Perfect for point-to-point travel. Pay only for the distance you travel with our reliable one-way drop service.
            </p>
          </div>

          {/* round trip */}
          <div className="bg-white rounded-2xl w-full text-center lg:mx-auto p-8 shadow-xl hover:scale-105 transition-transform duration-300 border-b-4 border-blue-600">
            <div className="w-[120px] h-[120px] mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <PiMapPinSimpleFill className="text-6xl text-blue-600" />
            </div>

            <h3 className="text-center text-2xl font-bold capitalize text-gray-800 mb-4">
              Round Trip
            </h3>
            <p className="text-center text-gray-600 font-medium leading-relaxed">
              Planning a return journey? Book a round trip and enjoy the convenience of having a dedicated cab at your service.
            </p>
          </div>
        </section>
      </section>
    </>
  );
};

export default Service