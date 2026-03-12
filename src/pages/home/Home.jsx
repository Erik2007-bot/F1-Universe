import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import racesData from '../../data/f1-2026.json';
import RaceCard from '../../components/race-card/RaceCard';
import ForumSection from '../../components/forum/ForumSection';
import './Home.css';

// logo
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Home = () => {
    // State for search filter
    const [searchTerm, setSearchTerm] = useState('');

    // Filter races based on search term
    const filteredRaces = racesData.filter(race =>
        race.raceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        race.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Next GP coords (Albert Park)
    const position = [-37.8497, 144.968];

    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Pequeño retardo para asegurar que el componente esté renderizado
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [hash]);

    return (
        <div className="home-page">
            <section className="hero">
                <h1>F1 Season 2026</h1>
                <p>Welcome to the new era of Formula 1</p>
            </section>

            <section className="next-race-map">
                <h2>Next Grand Prix Location</h2>
                <div className="map-container">
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                Circuito de Albert Park <br /> First Race of 2026.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </section>

            <section className="races-grid">
                <div className="section-header">
                    <h2>2026 Race Calendar</h2>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by race or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="grid-container">
                    {filteredRaces.length > 0 ? (
                        filteredRaces.map((race) => (
                            <RaceCard key={race.id} race={race} />
                        ))
                    ) : (
                        <p className="no-results">No races found matching your search.</p>
                    )}
                </div>
            </section>

            <ForumSection />
        </div>
    );
};

export default Home;
