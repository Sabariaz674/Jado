// src/components/adminPagesComponents/AddFlightForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddFlightForm = ({ onClose, onAddFlight, flightToEdit }) => {
    const [formData, setFormData] = useState({
        airline: '',
        logo: '',
        flightCode: '',
        departureTime: '', // Departure time string
        arrivalTime: '', // Arrival time string
        stop: '', // Number of stops
        duration: '',
        price: '',
        type: '',
        baggage: '',
        meal: '0', // Default meal quantity to '0'
        lax: '', // Departure airport code
        laf: '', // Arrival airport code
    });

    useEffect(() => {
        // If a flight is passed for editing, set the form data to that flight's data
        if (flightToEdit) {
            setFormData(prevData => ({
                ...prevData,
                ...flightToEdit,
                // Convert existing meal data to a quantity string for the input field
                meal: isNaN(parseInt(flightToEdit.meal)) ? '0' : String(parseInt(flightToEdit.meal))
            }));
        }
    }, [flightToEdit]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'logo' && files) {
            setFormData((prevData) => ({
                ...prevData,
                // When a file is selected, store the File object itself in the state
                logo: files[0], 
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // The key change is here: instead of a plain object, we use FormData
        // This allows us to correctly send the file along with the text data
        const formDataToSend = new FormData();

        // Append all the form fields to the FormData object
        formDataToSend.append('airline', formData.airline);
        formDataToSend.append('flightCode', formData.flightCode);
        formDataToSend.append('departure', `${formData.departureTime} - ${formData.arrivalTime}`);
        formDataToSend.append('departureTime', formData.departureTime);
        formDataToSend.append('arrivalTime', formData.arrivalTime);
        formDataToSend.append('stop', formData.stop);
        formDataToSend.append('duration', formData.duration);
        formDataToSend.append('price', Number(formData.price));
        formDataToSend.append('type', formData.type);
        formDataToSend.append('baggage', formData.baggage);
        
        // Check if meal quantity is 0, if not, append the quantity and the word "Meal" with proper pluralization
        const mealQuantity = parseInt(formData.meal, 10);
        const mealText = mealQuantity > 0 ? `${mealQuantity} Meal${mealQuantity > 1 ? 's' : ''}` : 'No Meal';
        formDataToSend.append('meal', mealText);
        
        formDataToSend.append('lax', formData.lax);
        formDataToSend.append('laf', formData.laf);

        // If a logo file exists, append the actual File object to the FormData
        if (formData.logo) {
            formDataToSend.append('logo', formData.logo);
        }
        
        const apiUrl = `http://localhost:8080/api/flights${flightToEdit ? `/${flightToEdit._id}` : '/createFlight'}`;
        const httpMethod = flightToEdit ? 'put' : 'post';

        axios[httpMethod](apiUrl, formDataToSend)
    .then((response) => {
        onAddFlight(response.data);
        onClose(); // sirf success hone par close hota tha
    })
    .catch((err) => {
        console.error(`Error ${flightToEdit ? 'updating' : 'adding'} flight:`, err);
        onClose(); // ab error hone par bhi close ho jayega
    });

    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-[#1e3a8a]">
                        {flightToEdit ? 'Update Flight' : 'Add New Flight'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Airline Name */}
                    <div>
                        <label htmlFor="airline" className="block text-sm font-medium text-gray-700">Airline Name</label>
                        <input type="text" id="airline" name="airline" value={formData.airline} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>

                    {/* Airline Logo (File Upload) */}
                    <div>
                        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Airline Logo</label>
                        <input type="file" id="logo" name="logo" accept="image/*" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>

                    {/* Flight Code */}
                    <div>
                        <label htmlFor="flightCode" className="block text-sm font-medium text-gray-700">Flight Code</label>
                        <input type="text" id="flightCode" name="flightCode" value={formData.flightCode} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>

                    {/* Number of Stops */}
                    <div>
                        <label htmlFor="stop" className="block text-sm font-medium text-gray-700">Number of Stops</label>
                        <input type="text" id="stop" name="stop" value={formData.stop} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 1 stop" required />
                    </div>

                    {/* Departure Airport Code */}
                    <div>
                        <label htmlFor="lax" className="block text-sm font-medium text-gray-700">Departure Airport Code</label>
                        <input type="text" id="lax" name="lax" value={formData.lax} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., LAX" required />
                    </div>

                    {/* Departure Time */}
                    <div>
                        <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">Departure Time</label>
                        <input type="text" id="departureTime" name="departureTime" value={formData.departureTime} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 7:00AM" required />
                    </div>

                    {/* Arrival Airport Code */}
                    <div>
                        <label htmlFor="laf" className="block text-sm font-medium text-gray-700">Arrival Airport Code</label>
                        <input type="text" id="laf" name="laf" value={formData.laf} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., JFK" required />
                    </div>

                    {/* Arrival Time */}
                    <div>
                        <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700">Arrival Time</label>
                        <input type="text" id="arrivalTime" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 4:15PM" required />
                    </div>

                    {/* Duration */}
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                        <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (per person)</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>

                    {/* Ticket Type */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Ticket Type</label>
                        <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., round trip" required />
                    </div>

                    {/* Baggage Info */}
                    <div>
                        <label htmlFor="baggage" className="block text-sm font-medium text-gray-700">Baggage Info</label>
                        <input type="text" id="baggage" name="baggage" value={formData.baggage} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 1 baggage" required />
                    </div>

                    {/* Meal Info Input */}
                    <div className="md:col-span-2">
                        <label htmlFor="meal" className="block text-sm font-medium text-gray-700">Number of Meals</label>
                        <input 
                            type="number" 
                            id="meal" 
                            name="meal" 
                            value={formData.meal} 
                            onChange={handleChange} 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                            min="0"
                            required 
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] rounded-md hover:bg-[#152963] transition-colors">
                            {flightToEdit ? 'Update Flight' : 'Add Flight'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFlightForm;
