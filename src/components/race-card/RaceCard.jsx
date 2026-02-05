import './RaceCard.css';

const RaceCard = ({ race }) => {
    return (
        <div className="race-card">
            <div className="card-header">
                <span className="round">Round {race.round}</span>
                <span className="date">{race.date}</span>
            </div>
            <div className="card-image">
                <img src={race.image} alt={race.raceName} />
            </div>
            <div className="card-body">
                <h3>{race.raceName}</h3>
                <p className="circuit">{race.circuit}</p>
                <p className="location">{race.location}</p>
            </div>
        </div>
    );
};

export default RaceCard;
