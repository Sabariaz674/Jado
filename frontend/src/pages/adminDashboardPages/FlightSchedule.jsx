import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFlights, addFlight, deleteFlight, updateFlight } from '../../redux/slices/flightSlice';
import AddFlightForm from '../../components/adminPagesComponents/AddFlightForm';
import FlightScheduleListing from '../../components/adminPagesComponents/FlightScheduleListing';

const FlightSchedule = () => {
    const dispatch = useDispatch();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [flightToUpdate, setFlightToUpdate] = useState(null);

    // ✅ Component load hone par flights ko fetch karein
    useEffect(() => {
        dispatch(fetchFlights());
    }, [dispatch]);

    const handleToggleForm = () => {
        setIsFormVisible(!isFormVisible);
        setFlightToUpdate(null);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (flightToUpdate) {
                await dispatch(updateFlight({ id: flightToUpdate._id, formData })).unwrap();
            } else {
                await dispatch(addFlight(formData)).unwrap();
            }
            
            // ✅ Operation successful hone ke baad flights ko dobara fetch karein
            dispatch(fetchFlights()); 

            setIsFormVisible(false);
            setFlightToUpdate(null);
        } catch (error) {
            console.error("Error submitting flight data:", error);
        }
    };

    const handleDeleteFlight = (flightId) => {
        if (window.confirm("Are you sure you want to delete this flight?")) {
            dispatch(deleteFlight(flightId))
                .unwrap()
                .then(() => {
                    // ✅ Deletion ke baad flights ki list ko dobara fetch karein
                    dispatch(fetchFlights());
                })
                .catch(error => {
                    console.error("Error deleting flight:", error);
                });
        }
    };

    const handleUpdateFlight = (flightData) => {
        setFlightToUpdate(flightData);
        setIsFormVisible(true);
    };

    return (
        <div className="flex justify-center items-center py-12 px-6 bg-gray-100">
            <div className="w-full max-w-7xl">
                <div className="bg-white p-8 rounded-lg shadow-xl">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Flight Schedule Management</h1>
                    
                    {isFormVisible && (
                        <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                {flightToUpdate ? 'Update Flight' : 'Add New Flight'}
                            </h2>
                            <AddFlightForm
                                onClose={handleToggleForm}
                                onSubmit={handleFormSubmit}
                                flightToEdit={flightToUpdate}
                            />
                        </div>
                    )}
                    
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={handleToggleForm}
                            className="bg-[#1e3a8a] text-white font-bold py-3 px-6 rounded-md shadow-lg hover:bg-[#152960] transition-colors duration-300"
                        >
                            {isFormVisible ? 'Hide Form' : 'Add New Flight'}
                        </button>
                    </div>

                    <FlightScheduleListing
                        onDeleteFlight={handleDeleteFlight}
                        onUpdateFlight={handleUpdateFlight}
                    />
                </div>
            </div>
        </div>
    );
};

export default FlightSchedule;



