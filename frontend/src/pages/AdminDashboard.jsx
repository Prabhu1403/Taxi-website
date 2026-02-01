import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('bookings');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [routePage, setRoutePage] = useState(1);
    const itemsPerPage = 5;

    // Booking Modal State
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Vehicle Form State
    const [showVehicleForm, setShowVehicleForm] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [vehicleForm, setVehicleForm] = useState({
        vehicleName: '',
        serviceType: 'One Way',
        ratePerKm: '',
        baseFare: '',
        status: 'Active'
    });

    useEffect(() => {
        const admin = localStorage.getItem('admin');
        if (!admin) {
            navigate('/adminlogin');
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [bookingsRes, vehiclesRes, routesRes] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/bookings`),
                fetch(`${import.meta.env.VITE_API_URL}/vehicles`),
                fetch(`${import.meta.env.VITE_API_URL}/routes`)
            ]);

            const bookingsData = await bookingsRes.json();
            const vehiclesData = await vehiclesRes.json();
            const routesData = await routesRes.json();

            setBookings(bookingsData);
            setVehicles(vehiclesData);
            setRoutes(routesData);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Booking Actions
    const handleDeleteBooking = async (id) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchData();
            }
        } catch (error) {
            alert('Error deleting booking');
        }
    };

    const viewBookingDetails = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`);
            const data = await response.json();
            setSelectedBooking(data);
            setShowDetailsModal(true);
        } catch (error) {
            alert('Error fetching booking details');
        }
    };

    // Route Actions
    const handleDeleteRoute = async (id) => {
        if (!window.confirm('Are you sure you want to delete this route?')) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/routes/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchData();
            }
        } catch (error) {
            alert('Error deleting route');
        }
    };

    // Vehicle CRUD
    const handleVehicleSubmit = async (e) => {
        e.preventDefault();
        const url = editingVehicle
            ? `${import.meta.env.VITE_API_URL}/vehicles/${editingVehicle.id}`
            : `${import.meta.env.VITE_API_URL}/vehicles`;

        const method = editingVehicle ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vehicleForm)
            });

            if (response.ok) {
                alert(`Vehicle ${editingVehicle ? 'updated' : 'added'} successfully!`);
                setShowVehicleForm(false);
                setEditingVehicle(null);
                setVehicleForm({ vehicleName: '', serviceType: 'One Way', ratePerKm: '', baseFare: '', status: 'Active' });
                fetchData();
            }
        } catch (error) {
            alert('Error saving vehicle');
        }
    };

    const handleDeleteVehicle = async (id) => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/vehicles/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchData();
            }
        } catch (error) {
            alert('Error deleting vehicle');
        }
    };

    const startEditVehicle = (v) => {
        setEditingVehicle(v);
        setVehicleForm({
            vehicleName: v.vehicleName,
            serviceType: v.serviceType,
            ratePerKm: v.ratePerKm,
            baseFare: v.baseFare,
            status: v.status
        });
        setShowVehicleForm(true);
    };

    // Pagination Logic
    const indexOfLastBooking = currentPage * itemsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const totalPages = Math.ceil(bookings.length / itemsPerPage);

    const indexOfLastRoute = routePage * itemsPerPage;
    const indexOfFirstRoute = indexOfLastRoute - itemsPerPage;
    const currentRoutes = routes.slice(indexOfFirstRoute, indexOfLastRoute);
    const totalRoutePages = Math.ceil(routes.length / itemsPerPage);

    const vehiclesOneWay = vehicles.filter(v => v.serviceType === 'One Way');
    const vehiclesRoundTrip = vehicles.filter(v => v.serviceType === 'Round Trip');

    if (loading) return <div className="p-20 text-center font-bold">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <button
                        onClick={() => { localStorage.removeItem('admin'); navigate('/'); }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                        <p className="text-sm text-gray-500 uppercase font-bold">Total Vehicles</p>
                        <p className="text-4xl font-black text-gray-800">{vehicles.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                        <p className="text-sm text-gray-500 uppercase font-bold">Total Bookings</p>
                        <p className="text-4xl font-black text-gray-800">{bookings.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                        <p className="text-sm text-gray-500 uppercase font-bold">Total Routes</p>
                        <p className="text-4xl font-black text-gray-800">{routes.length}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`px-6 py-2 font-bold rounded-lg transition ${activeTab === 'bookings' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                    >
                        Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab('vehicles')}
                        className={`px-6 py-2 font-bold rounded-lg transition ${activeTab === 'vehicles' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                    >
                        Vehicles
                    </button>
                    <button
                        onClick={() => setActiveTab('routes')}
                        className={`px-6 py-2 font-bold rounded-lg transition ${activeTab === 'routes' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                    >
                        Routes
                    </button>
                </div>

                {/* Bookings View */}
                {activeTab === 'bookings' && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                            <h2 className="font-bold text-lg">All Bookings</h2>
                        </div>

                        {/* Booking Details Modal */}
                        {showDetailsModal && selectedBooking && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                                <div className="bg-white p-6 md:p-10 rounded-2xl w-full max-w-lg shadow-2xl relative">
                                    <button onClick={() => setShowDetailsModal(false)} className="absolute top-4 right-4 text-2xl">✕</button>
                                    <h2 className="text-2xl font-bold mb-6 text-green-700">Booking Details</h2>

                                    <div className="space-y-4 text-gray-700">
                                        <div className="grid grid-cols-2 border-b pb-2">
                                            <span className="font-bold text-xs uppercase text-gray-400">Booking ID</span>
                                            <span className="text-sm font-mono truncate">{selectedBooking.id}</span>
                                        </div>
                                        <div className="grid grid-cols-2 border-b pb-2">
                                            <span className="font-bold">Customer Name</span>
                                            <span>{selectedBooking.customerName}</span>
                                        </div>
                                        <div className="grid grid-cols-2 border-b pb-2">
                                            <span className="font-bold">Phone Number</span>
                                            <span>{selectedBooking.customerPhone}</span>
                                        </div>
                                        <div className="grid grid-cols-2 border-b pb-2">
                                            <span className="font-bold">From</span>
                                            <span>{selectedBooking.pickupLocation}</span>
                                        </div>
                                        <div className="grid grid-cols-2 border-b pb-2">
                                            <span className="font-bold">To</span>
                                            <span>{selectedBooking.dropoffLocation}</span>
                                        </div>
                                        <div className="grid grid-cols-2 border-b pb-2">
                                            <span className="font-bold">Trip Type</span>
                                            <span className="font-bold text-blue-600">{selectedBooking.serviceType}</span>
                                        </div>
                                        <div className="grid grid-cols-2 border-b pb-2">
                                            <span className="font-bold">Pickup Time</span>
                                            <span>{new Date(selectedBooking.pickupTime).toLocaleString()}</span>
                                        </div>
                                        <div className="grid grid-cols-2 border-b pb-2">
                                            <span className="font-bold">Vehicle</span>
                                            <span>{selectedBooking.Vehicle?.vehicleName || 'N/A'}</span>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span className="font-bold">Status</span>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold self-start w-fit">
                                                {selectedBooking.status}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowDetailsModal(false)}
                                        className="mt-8 w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                    <tr>
                                        <th className="p-4">Customer</th>
                                        <th className="p-4">Route</th>
                                        <th className="p-4">Time</th>
                                        <th className="p-4">Vehicle</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {currentBookings.map(b => (
                                        <tr key={b.id} className="hover:bg-gray-50">
                                            <td className="p-4">
                                                <p className="font-bold">{b.customerName}</p>
                                                <p className="text-xs text-gray-500">{b.customerPhone}</p>
                                            </td>
                                            <td className="p-4 text-sm">
                                                {b.pickupLocation} ➔ {b.dropoffLocation}
                                                <p className="text-xs text-blue-600">{b.serviceType}</p>
                                            </td>
                                            <td className="p-4 text-xs">
                                                {new Date(b.pickupTime).toLocaleString()}
                                            </td>
                                            <td className="p-4 text-sm">
                                                {b.Vehicle?.vehicleName || 'N/A'}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {b.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-3">
                                                    <button onClick={() => viewBookingDetails(b.id)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition" title="View Details">👁️</button>
                                                    <button onClick={() => handleDeleteBooking(b.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition" title="Delete Booking">🗑️</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="p-4 flex justify-between items-center bg-gray-50">
                            <p className="text-sm text-gray-500">Showing {indexOfFirstBooking + 1} to {Math.min(indexOfLastBooking, bookings.length)} of {bookings.length}</p>
                            <div className="flex gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="px-3 py-1 bg-white border rounded disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-white'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="px-3 py-1 bg-white border rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Vehicles View */}
                {activeTab === 'vehicles' && (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Manage Vehicles</h2>
                            <button
                                onClick={() => { setEditingVehicle(null); setVehicleForm({ vehicleName: '', serviceType: 'One Way', ratePerKm: '', baseFare: '', status: 'Active' }); setShowVehicleForm(true); }}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700"
                            >
                                + Add Vehicle
                            </button>
                        </div>

                        {/* Vehicle Form Modal */}
                        {showVehicleForm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                                <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
                                    <h3 className="text-xl font-bold mb-4">{editingVehicle ? 'Edit' : 'Add'} Vehicle</h3>
                                    <form onSubmit={handleVehicleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase mb-1">Vehicle Name</label>
                                            <input required value={vehicleForm.vehicleName} onChange={e => setVehicleForm({ ...vehicleForm, vehicleName: e.target.value })} className="w-full border p-2 rounded" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase mb-1">Service Type</label>
                                            <select value={vehicleForm.serviceType} onChange={e => setVehicleForm({ ...vehicleForm, serviceType: e.target.value })} className="w-full border p-2 rounded">
                                                <option value="One Way">One Way</option>
                                                <option value="Round Trip">Round Trip</option>
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase mb-1">Rate / KM</label>
                                                <input required type="number" value={vehicleForm.ratePerKm} onChange={e => setVehicleForm({ ...vehicleForm, ratePerKm: e.target.value })} className="w-full border p-2 rounded" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase mb-1">Base Fare</label>
                                                <input required type="number" value={vehicleForm.baseFare} onChange={e => setVehicleForm({ ...vehicleForm, baseFare: e.target.value })} className="w-full border p-2 rounded" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase mb-1">Status</label>
                                            <select value={vehicleForm.status} onChange={e => setVehicleForm({ ...vehicleForm, status: e.target.value })} className="w-full border p-2 rounded">
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-2 pt-4">
                                            <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded font-bold">{editingVehicle ? 'Update' : 'Save'}</button>
                                            <button type="button" onClick={() => setShowVehicleForm(false)} className="flex-1 bg-gray-200 py-2 rounded font-bold">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Categorized Vehicles */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* One Way */}
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-bold mb-4 text-blue-600 border-b pb-2">One Way Vehicles</h3>
                                <div className="space-y-4">
                                    {vehiclesOneWay.map(v => (
                                        <div key={v.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                                            <div>
                                                <p className="font-bold">{v.vehicleName}</p>
                                                <p className="text-xs text-gray-500">₹{v.ratePerKm}/km | ₹{v.baseFare} Base</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => startEditVehicle(v)} className="text-blue-600 hover:bg-blue-50 p-1 rounded">✏️</button>
                                                <button onClick={() => handleDeleteVehicle(v.id)} className="text-red-600 hover:bg-red-50 p-1 rounded">🗑️</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Round Trip */}
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-bold mb-4 text-orange-600 border-b pb-2">Round Trip Vehicles</h3>
                                <div className="space-y-4">
                                    {vehiclesRoundTrip.map(v => (
                                        <div key={v.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                                            <div>
                                                <p className="font-bold">{v.vehicleName}</p>
                                                <p className="text-xs text-gray-500">₹{v.ratePerKm}/km | ₹{v.baseFare} Base</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => startEditVehicle(v)} className="text-blue-600 hover:bg-blue-50 p-1 rounded">✏️</button>
                                                <button onClick={() => handleDeleteVehicle(v.id)} className="text-red-600 hover:bg-red-50 p-1 rounded">🗑️</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Routes View */}
                {activeTab === 'routes' && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                            <h2 className="font-bold text-lg">Manage Routes</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                    <tr>
                                        <th className="p-4">Source</th>
                                        <th className="p-4">Destination</th>
                                        <th className="p-4">Distance (KM)</th>
                                        <th className="p-4">Est. Time</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {currentRoutes.map(r => (
                                        <tr key={r.id} className="hover:bg-gray-50">
                                            <td className="p-4 font-bold">{r.source}</td>
                                            <td className="p-4 font-bold">{r.destination}</td>
                                            <td className="p-4">{r.distanceKm}</td>
                                            <td className="p-4">{r.estimatedTime}</td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => handleDeleteRoute(r.id)}
                                                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition" title="Delete Route"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="p-4 flex justify-between items-center bg-gray-50">
                            <p className="text-sm text-gray-500">Showing {indexOfFirstRoute + 1} to {Math.min(indexOfLastRoute, routes.length)} of {routes.length}</p>
                            <div className="flex gap-2">
                                <button
                                    disabled={routePage === 1}
                                    onClick={() => setRoutePage(prev => prev - 1)}
                                    className="px-3 py-1 bg-white border rounded disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                {[...Array(totalRoutePages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setRoutePage(i + 1)}
                                        className={`px-3 py-1 border rounded ${routePage === i + 1 ? 'bg-orange-600 text-white' : 'bg-white'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    disabled={routePage === totalRoutePages}
                                    onClick={() => setRoutePage(prev => prev + 1)}
                                    className="px-3 py-1 bg-white border rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
