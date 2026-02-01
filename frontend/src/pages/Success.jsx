import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vehicle, tripDetails } = location.state || {};

    const [customer, setCustomer] = useState({ name: '', phone: '' });
    const [bookingId, setBookingId] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!vehicle || !tripDetails) {
        return (
            <div className='text-center p-20'>
                <h2 className='text-2xl font-bold'>No active booking session.</h2>
                <button onClick={() => navigate('/')} className='mt-4 bg-green-600 text-white px-6 py-2 rounded'>Go Home</button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const bookingData = {
            vehicleId: vehicle.id,
            customerName: customer.name,
            customerPhone: customer.phone,
            pickupLocation: tripDetails.pickup,
            dropoffLocation: tripDetails.drop,
            serviceType: tripDetails.serviceType,
            pickupTime: `${tripDetails.date}T${tripDetails.time}:00`, // Standard date format
            status: 'Confirmed'
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });

            if (!response.ok) throw new Error('Failed to save booking');

            const result = await response.json();
            setBookingId(result.id);
        } catch (error) {
            alert('Error saving booking: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (bookingId) {
        return (
            <div className='flex justify-center items-center min-h-[80vh] bg-gray-50 p-4'>
                <div className='bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border-t-8 border-green-500'>
                    <div className='text-6xl mb-6'>✅</div>
                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>Booking Successful!</h2>
                    <p className='text-gray-500 mb-8'>Your ride has been confirmed.</p>

                    <div className='bg-gray-100 p-4 rounded-lg mb-8'>
                        <span className='text-xs uppercase text-gray-400 font-bold'>Booking ID</span>
                        <p className='text-lg font-mono font-bold text-green-700 truncate'>{bookingId}</p>
                    </div>

                    <div className='text-left border-b pb-4 mb-4 text-sm'>
                        <p><strong>Vehicle:</strong> {vehicle.vehicleName}</p>
                        <p><strong>Route:</strong> {tripDetails.pickup} to {tripDetails.drop}</p>
                        <p><strong>Time:</strong> {tripDetails.date} at {tripDetails.time}</p>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition duration-300'
                    >
                        Go to Home Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='flex justify-center items-center min-h-[80vh] bg-gray-50 p-4'>
            <div className='bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full'>
                <h2 className='text-2xl font-bold mb-6 text-gray-800 border-b pb-4'>Finalize Your Booking</h2>

                <div className='mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100'>
                    <p className='text-sm text-blue-800 font-semibold uppercase mb-2'>Selected Ride</p>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='font-bold text-lg'>{vehicle.vehicleName}</p>
                            <p className='text-xs text-blue-600'>{tripDetails.serviceType} Trip</p>
                        </div>
                        <div className='text-right'>
                            <p className='font-bold text-green-600 font-mono'>₹{vehicle.ratePerKm}/km</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-bold text-gray-700 mb-1 uppercase text-xs'>Your Name</label>
                        <input
                            required
                            type="text"
                            className='w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 outline-none transition'
                            placeholder='Enter full name'
                            value={customer.name}
                            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-bold text-gray-700 mb-1 uppercase text-xs'>Phone Number</label>
                        <input
                            required
                            type="tel"
                            className='w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 outline-none transition'
                            placeholder='Enter 10 digit number'
                            value={customer.phone}
                            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition duration-300 disabled:bg-gray-400'
                    >
                        {loading ? 'Processing...' : 'Save Booking'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Success
