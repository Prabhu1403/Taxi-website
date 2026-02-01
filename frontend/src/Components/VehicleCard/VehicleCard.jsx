import { useNavigate, useLocation } from 'react-router-dom'
import carImage from '../../assets/images/car.png'

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tripDetails = location.state;

  if (!vehicle) return null;

  const handleBookNow = () => {
    navigate('/success', {
      state: {
        vehicle,
        tripDetails
      }
    });
  };

  return (
    <>
      <div className='flex flex-col md:flex-row items-center border p-4 m-4 rounded-lg shadow-md bg-white w-full max-w-2xl'>
        <section className='w-full md:w-1/3'>
          <img src={carImage} alt={vehicle.vehicleName} className='w-full h-auto object-contain' />
        </section>
        <section className='w-full md:w-1/2 md:pl-6 mt-4 md:mt-0'>
          <h3 className='text-xl font-bold uppercase text-gray-800'>{vehicle.vehicleName}</h3>
          <div className='mt-2 space-y-1 text-gray-600'>
            <p className='font-semibold text-blue-600'>Service: {vehicle.serviceType}</p>
            <p>Rate per KM: <span className='font-bold text-green-600'>₹{vehicle.ratePerKm}</span></p>
            <p>Driver Bata (Base Fare): <span className='font-bold text-orange-600'>₹{vehicle.baseFare}</span></p>
            <p className={`text-sm ${vehicle.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
              Status: {vehicle.status}
            </p>
          </div>
        </section>
        <button
          onClick={handleBookNow}
          className='mt-4 md:mt-0 md:ml-auto bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded transition duration-300'
        >
          Book Now
        </button>
      </div>
    </>
  )
}

export default VehicleCard
