import './Drivers.css';

const driversData = [
    { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', number: 1, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png' },
    { id: 2, name: 'Lewis Hamilton', team: 'Ferrari', number: 44, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png' },
    { id: 3, name: 'Lando Norris', team: 'McLaren', number: 4, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png' },
    { id: 4, name: 'Nico Hulkenberg', team: 'Audi', number: 27, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col/image.png' },
    { id: 5, name: 'Carlos Sainz', team: 'Williams', number: 55, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png' }
];

const Drivers = () => {
    return (
        <div className="drivers-page">
            <h1>2026 Drivers Grid</h1>
            <div className="drivers-grid">
                {driversData.map(driver => (
                    <div key={driver.id} className="driver-card">
                        <div className="driver-header">
                            <span className="driver-number">{driver.number}</span>
                            <span className="driver-team">{driver.team}</span>
                        </div>
                        <img src={driver.image} alt={driver.name} className="driver-image" />
                        <div className="driver-info">
                            <h2>{driver.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Drivers;
