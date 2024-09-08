import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CircleMarker, Icon, LatLngTuple, SVG } from "leaflet";
import {
  TileLayerProps,
  PolylineProps,
  MarkerProps,
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import { Locate, MapPin, Pointer, PointerIcon } from "lucide-react";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import EmergencyButton from "./EmergencyButton";
import AcceptEmergencyButton from "./AcceptEmergency";
// const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
// const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false }) as React.ComponentType<TileLayerProps>;
// const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false }) as React.ComponentType<MarkerProps>;
// const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false }) as React.ComponentType<PolylineProps>;

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface RideData {
  driver: string;
  rider: string;
  startLocation: Coordinates;
  endLocation: Coordinates;
  currentLocation: Coordinates;
}

interface CurrentRideMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  rideData: RideData;
}

const iconMarkup = renderToStaticMarkup(
  <>
    <div style={{ color: "black" }}>
      <MapPin />
    </div>
  </>
);
export const customIcon = L.divIcon({
  html: iconMarkup,
  className: "custom-icon",
  iconSize: [24, 24],
  iconAnchor: [24 / 2, 24],
});

const CurrentRideMapModal: React.FC<CurrentRideMapModalProps> = ({
  isOpen,
  onClose,
  rideData,
}) => {
  const [currentPosition, setCurrentPosition] = useState<LatLngTuple>([
    rideData.currentLocation.latitude,
    rideData.currentLocation.longitude,
  ]);

  useEffect(() => {
    // Update current position when rideData changes
    setCurrentPosition([
      rideData.currentLocation.latitude,
      rideData.currentLocation.longitude,
    ]);
  }, [rideData.currentLocation]);

  if (!isOpen) return null;

  const startPosition: LatLngTuple = [
    rideData.startLocation.latitude,
    rideData.startLocation.longitude,
  ];
  const endPosition: LatLngTuple = [
    rideData.endLocation.latitude,
    rideData.endLocation.longitude,
  ];
  

 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-10">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Current Ride</h2>
        </div>
        <div className="p-4">
          <div className="h-[400px] w-full mb-4">
            <MapContainer
              center={currentPosition}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={startPosition} icon={customIcon}/>
              <Marker position={endPosition} icon={customIcon} />
              <Marker position={currentPosition} icon={customIcon} />
              <Polyline
                positions={[startPosition, currentPosition, endPosition]}
                color="blue"
              />
            </MapContainer>
          </div>
          <div className="mb-2">
            <strong>Driver:</strong> {rideData.driver}
          </div>
          <div className="mb-2">
            <strong>Rider:</strong> {rideData.rider}
          </div>
        </div>
        {/* <AcceptEmergencyButton rideId={0}/> */}
        <EmergencyButton/>
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentRideMapModal;
