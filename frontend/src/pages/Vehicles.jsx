
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import VehicleCard from '../Components/VehicleCard/VehicleCard'

const Vehicles = () => {
  const location = useLocation();
  const tripDetails = location.state;

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/vehicles`);
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();

        // Filter by serviceType if tripDetails exists
        if (tripDetails && tripDetails.serviceType) {
          const filteredData = data.filter(v => v.serviceType === tripDetails.serviceType);
          setVehicles(filteredData);
        } else {
          setVehicles(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [tripDetails]);

  if (loading) return <div className="text-center p-10 font-bold text-xl">Searching for available vehicles...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <div className='bg-gray-50 min-h-screen py-10'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl font-extrabold text-gray-900'>Available Vehicles</h2>
          {tripDetails && (
            <div className='mt-4 p-4 bg-green-100 text-green-800 rounded-lg inline-block border border-green-200'>
              <p className='font-bold uppercase'>{tripDetails.serviceType} Trip</p>
              <p className='text-sm'>{tripDetails.pickup} ➔ {tripDetails.drop}</p>
              <p className='text-xs mt-1'>{tripDetails.date} at {tripDetails.time}</p>
            </div>
          )}
        </div>

        <div className='flex flex-col items-center gap-6'>
          {vehicles.length > 0 ? (
            vehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))
          ) : (
            <div className='text-center p-10 bg-white rounded-lg shadow w-full max-w-2xl'>
              <p className='text-gray-500'>No vehicles available for the selected trip type.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Vehicles
