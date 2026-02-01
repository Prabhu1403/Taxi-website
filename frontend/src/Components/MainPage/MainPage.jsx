import React from "react";
import taxiImage from "../../assets/images/taxi.jpg";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex lg:justify-center lg:gap-[80px]  flex-col lg:flex-row items-center ">

        <section className=" lg:w-[400px] text-center w-full lg:text-left mt-[30px] ">
          <h2 className="lg:text-3xl  text-xl font-bold mb-[20px] capitalize">
            Book Your <span className="text-green-600">Taxi Easily</span>{" "}
          </h2>
          <p className="text-2xl leading-relaxed capitalize mb-[20px] ">
            fast,safe and affordable taxi services for your every travel
          </p>
          <p className="text-xl mb-[20px] font-semibold leading-relaxed capitalize ">
            book one-way or round-way-trip taxis tha best rate.simple
            transparant pricing for all your travel needs
          </p>

          <button onClick={() => navigate('/booking')} className="bg-green-600 border-none transition cursor-pointer px-4 py-1 hover:bg-white hover:text-green-600 rounded-lg text-white font-semibold text-[18px] ">
            Book Now
          </button>
        </section>

        <section className=" lg:w-[500px] ">
          <img src={`${taxiImage}`} alt="" className="w-full object-cover " />
        </section>
      </div>
    </>
  );
};

export default MainPage;
