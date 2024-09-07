import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import Modal from '@/components/ui/modal'; // Import the new Modal component

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

interface LocationPickerProps {
  destination: Coordinates;
  setDestination: React.Dispatch<React.SetStateAction<Coordinates>>;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ destination, setDestination }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const MapEvents: React.FC = () => {
    useMapEvents({
      click(e:any) {
        setDestination({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng
        });
      },
    });
    return null;
  };

  return (
    <>
      <div 
        className="flex items-center gap-2.5 p-4 rounded-lg border border-gray-200 bg-white shadow-sm cursor-pointer hover:bg-gray-50 cursor-pointer z-10"
        onClick={handleOpenModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-lg text-gray-700">
          {destination.latitude && destination.longitude
            ? `${destination.latitude.toFixed(4)}, ${destination.longitude.toFixed(4)}`
            : "Select destinations"}
        </span>
      </div>

      <Modal isOpen={isOpen} onClose={handleCloseModal} title="Select Destination">
        <div className="h-[400px] w-full mb-4">
          <MapContainer 
            center={[destination.latitude || 0, destination.longitude || 0]} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {destination.latitude && destination.longitude && (
              <Marker position={[destination.latitude, destination.longitude]} />
            )}
            <MapEvents />
          </MapContainer>
        </div>
        <div className="flex justify-end">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleCloseModal}
          >
            Confirm Location
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LocationPicker;