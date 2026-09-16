import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function LocationMarker({ position, setPosition }) {
  const map = useMap();

  useMapEvents({
    click(e) {
      const newPos = [e.latlng.lat, e.latlng.lng];
      setPosition(newPos);
    },
  });

  // Recenter map when position changes from outside
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom() < 13 ? 13 : map.getZoom());
    }
  }, [position, map]);

  return position ? <Marker position={position} icon={redIcon} /> : null;
}

function LocationPicker({ value, onChange }) {
  const [position, setPosition] = useState(value || null);
  const [locating, setLocating] = useState(false);

  // Sync when value prop changes (e.g., profile loads)
  useEffect(() => {
    if (value && (!position || value[0] !== position[0] || value[1] !== position[1])) {
      setPosition(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleSetPosition = (pos) => {
    setPosition(pos);
    if (onChange) {
      onChange(pos);
    }
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        handleSetPosition(coords);
        setLocating(false);
      },
      (err) => {
        alert('Unable to get your location. Please allow location access.');
        setLocating(false);
      }
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-gray-700 font-medium">
          <FaMapMarkerAlt className="inline mr-1 text-red-600" />
          Click on the map to select your location
        </label>
        <button
          type="button"
          onClick={getUserLocation}
          disabled={locating}
          className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {locating ? 'Locating...' : 'Use My Location'}
        </button>
      </div>

      <div className="rounded-lg overflow-hidden border-2 border-gray-200">
        <MapContainer
          center={position || [20.5937, 78.9629]}
          zoom={position ? 15 : 5}
          style={{ height: '300px', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={handleSetPosition} />
        </MapContainer>
      </div>

      {position && (
        <p className="text-sm text-gray-600 mt-2">
          Selected: {position[0].toFixed(4)}, {position[1].toFixed(4)}
        </p>
      )}
    </div>
  );
}

export default LocationPicker;