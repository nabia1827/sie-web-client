import React from 'react';
import { MapContainer, TileLayer, CircleMarker, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import peruGeoJson from '../../assets/animations/peruGeoJson.json'; 

const data = [
    { department: "Lima", cases: 1000, coordinates: [-12.0464, -77.0428] },
    { department: "Cusco", cases: 500, coordinates: [-13.5319, -71.9675] },
    // Agrega más departamentos y datos aquí
];

const ChartMap = () => {
    return (
        <MapContainer center={[-9.19, -75.0152]} zoom={6} style={{ height: "100%", width: "100%",borderRadius: "0.7em" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON data={peruGeoJson} style={{ color: "#1E3A8A", weight: 1 }} />
            
            {data.map((item, index) => (
                <CircleMarker
                    key={index}
                    center={item.coordinates}
                    radius={Math.sqrt(item.cases) * 0.5} // Ajusta el tamaño según los casos
                    fillColor="rgba(82, 113, 255, 1)"
                    color="rgba(82, 113, 255, 1)"
                    weight={1}
                >
                </CircleMarker>
            ))}
        </MapContainer>
    );
};

export default ChartMap;
