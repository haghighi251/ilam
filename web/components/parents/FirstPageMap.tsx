import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const FirstPageMap = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      scrollWheelZoom={false}>
      <TileLayer
        className="w-full"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default FirstPageMap;
