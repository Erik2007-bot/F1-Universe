import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import racesData from '../../data/f1-2026.json';
import RaceCard from '../../components/race-card/RaceCard';
import './Home.css';

// Fix Leaflet marker icon issue
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
    // Next GP coords (Bahrain)
    const position = [26.0325, 50.5106];

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
                                Bahrain International Circuit <br /> First Race of 2026.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </section>

            <section className="races-grid">
                <h2>2026 Race Calendar</h2>
                <div className="grid-container">
                    {racesData.map((race) => (
                        <RaceCard key={race.id} race={race} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
