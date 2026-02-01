import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BookingForm = () => {
   const navigate = useNavigate();
   const [trip, setTrip] = useState('One Way') // Updated to match backend ENUM
   const [routes, setRoutes] = useState([])
   const [suggestions, setSuggestions] = useState({ pickup: [], drop: [] })
   const [form, setForm] = useState({
      pickup: '',
      drop: '',
      date: '',
      time: ''
   })

   useEffect(() => {
      const fetchRoutes = async () => {
         try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/routes`);
            const data = await response.json();
            setRoutes(data);
         } catch (error) {
            console.error('Error fetching routes:', error);
         }
      };
      fetchRoutes();
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({
         ...form,
         [name]: value
      });

      // Simple suggestion logic
      if (name === 'pickup' || name === 'drop') {
         if (value.length > 1) {
            const filtered = routes
               .filter(r =>
                  (name === 'pickup' ? r.source : r.destination)
                     .toLowerCase().includes(value.toLowerCase())
               )
               .map(r => name === 'pickup' ? r.source : r.destination);

            // Get unique suggestions
            const uniqueSuggestions = [...new Set(filtered)];
            setSuggestions(prev => ({ ...prev, [name]: uniqueSuggestions }));
         } else {
            setSuggestions(prev => ({ ...prev, [name]: [] }));
         }
      }
   }

   const handleSuggestionClick = (name, value) => {
      setForm(prev => ({ ...prev, [name]: value }));
      setSuggestions(prev => ({ ...prev, [name]: [] }));
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      const { pickup, drop, date, time } = form

      console.log("entering the function")

      if (!pickup || !drop || !date || !time) {
         alert("all fields are required")
         return
      }

      const finalData = {
         serviceType: trip,
         ...form
      }

      console.log('Navigating with data:', finalData);
      navigate('/vehicles', { state: finalData });
   }

   return (
      <>
         <div className='w-full flex justify-center items-center p-3'>
            <section className='bg-green-600 p-8 rounded-lg mt-[100px] text-white lg:w-fit w-full mx-auto '>
               <div className='flex justify-center items-center gap-6 mb-6 font-bold text-xl lg:text-2xl '>
                  <button onClick={() => setTrip('One Way')} className={`cursor-pointer ${trip === 'One Way' ? 'bg-white text-green-600 px-4 rounded-lg py-1' : null}`}>One Way</button>
                  <button onClick={() => setTrip('Round Trip')} className={`cursor-pointer ${trip === 'Round Trip' ? 'bg-white text-green-600 px-4 rounded-lg py-1' : null}`}>Round Trip</button>
               </div>
               <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-2 gap-10 uppercase'>
                  <div className='flex flex-col gap-1 relative'>
                     <label htmlFor="pickup" className='text-[18px] font-semibold'>pickup location</label>
                     <input type="text" autoComplete="off" onChange={handleChange} value={form.pickup} name='pickup' id='pickup' className='border-2 border-gray-300 p-2 outline-none rounded-lg text-black' />
                     {suggestions.pickup.length > 0 && (
                        <ul className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg text-black z-10 shadow-lg'>
                           {suggestions.pickup.map((s, i) => (
                              <li key={i} onClick={() => handleSuggestionClick('pickup', s)} className='p-2 hover:bg-gray-100 cursor-pointer'>{s}</li>
                           ))}
                        </ul>
                     )}
                  </div>
                  <div className='flex flex-col gap-1 relative'>
                     <label htmlFor="drop" className='text-[18px] font-semibold'>drop location</label>
                     <input type="text" autoComplete="off" onChange={handleChange} id='drop' name='drop' value={form.drop} className='border-2 border-gray-300 p-2 outline-none rounded-lg text-black' />
                     {suggestions.drop.length > 0 && (
                        <ul className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg text-black z-10 shadow-lg'>
                           {suggestions.drop.map((s, i) => (
                              <li key={i} onClick={() => handleSuggestionClick('drop', s)} className='p-2 hover:bg-gray-100 cursor-pointer'>{s}</li>
                           ))}
                        </ul>
                     )}
                  </div>
                  <div className='flex flex-col gap-1'>
                     <label htmlFor="date" className='text-[18px] font-semibold'>pickup date</label>
                     <input type="date" onChange={handleChange} id='date' name='date' value={form.date} className='border-2 border-gray-300 p-2 outline-none rounded-lg text-black' />
                  </div>
                  <div className='flex flex-col gap-1'>
                     <label htmlFor="time" className='text-[18px] font-semibold'>pickup time</label>
                     <input type="time" onChange={handleChange} id='time' name='time' value={form.time} className='border-2 border-gray-300 p-2 outline-none rounded-lg text-black' />
                  </div>
                  <button type='submit' className='lg:col-span-2 w-full text-green-600 bg-white p-3 font-semibold text-[20px] rounded-lg cursor-pointer capitalize hover:bg-gray-100 transition duration-300'>search cab</button>
               </form>
            </section>
         </div>
      </>
   )
}

export default BookingForm
