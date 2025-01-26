import React from 'react';
import { MapContainer, TileLayer, CircleMarker, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import peruGeoJson from '../../assets/animations/peruGeoJson.json'; 

const data = [
    { department: "Lima", cases: 1000, coordinates: [-12.0464, -77.0428] },
    { department: "Cusco", cases: 500, coordinates: [-13.5319, -71.9675] },
    // Agrega más departamentos y datos aquí
];

const ChartMap = (props) => {
    const {chartData} = props;
    const maxCases = Math.max(...chartData.map(d => d.cantidad));

    const getRadius = (cases) => {
        const scaleFactor = 10; // Ajusta este valor según el tamaño que desees
        return Math.sqrt(cases / maxCases) * scaleFactor;
    };

    return (
        <MapContainer center={[-9.19, -75.0152]} zoom={6} style={{ height: "100%", width: "100%",borderRadius: "0.7em" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON data={peruGeoJson} style={{ color: "#1E3A8A", weight: 1 }} />
            
            {chartData.map((d) => (
                <CircleMarker
                    key={d.depId}
                    center={[d.depLatitud,d.depLongitud]}
                    radius={getRadius(d.cantidad)}
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
