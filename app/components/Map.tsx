"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet/dist/leaflet.js"
import L from "leaflet"

const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

L.Marker.prototype.options.icon = customIcon

interface Location {
  id: string
  name: string
  type: string
  coordinates: [number, number]
}

const universityLocations: Location[] = [
  { id: "1", name: "Main Library", type: "library", coordinates: [40.7128, -74.006] },
  { id: "2", name: "Student Center", type: "building", coordinates: [40.714, -74.0062] },
  { id: "3", name: "Science Building", type: "academic", coordinates: [40.7135, -74.0055] },
  { id: "4", name: "Sports Complex", type: "sports", coordinates: [40.712, -74.007] },
  { id: "5", name: "Dormitory A", type: "housing", coordinates: [40.7145, -74.0065] },
  { id: "6", name: "Cafeteria", type: "dining", coordinates: [40.7138, -74.0058] },
]

interface MapProps {
  query: string
}

export default function Map({ query }: MapProps) {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(universityLocations)

  useEffect(() => {
    const lowercaseQuery = query.toLowerCase()
    const filtered = universityLocations.filter(
      (location) =>
        location.name.toLowerCase().includes(lowercaseQuery) || location.type.toLowerCase().includes(lowercaseQuery),
    )
    setFilteredLocations(filtered)
  }, [query])

  return (
    <MapContainer center={[40.7128, -74.006]} zoom={16} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap </a> contributors'
      />
      {filteredLocations.map((location) => (
        <Marker key={location.id} position={location.coordinates} icon={customIcon}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

