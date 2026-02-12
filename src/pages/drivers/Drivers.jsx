import './Drivers.css';

const driversData = [
    { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', number: 3, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png' },
    { id: 2, name: 'Isack Hadjar', team: 'Red Bull Racing', number: 6, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png.transform/2col/image.png' },
    { id: 3, name: 'Lewis Hamilton', team: 'Ferrari', number: 44, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png' },
    { id: 4, name: 'Charles Leclerc', team: 'Ferrari', number: 16, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png' },
    { id: 5, name: 'Lando Norris', team: 'McLaren', number: 1, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png' },
    { id: 6, name: 'Oscar Piastri', team: 'McLaren', number: 81, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png' },
    { id: 7, name: 'George Russell', team: 'Mercedes', number: 63, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png' },
    { id: 8, name: 'Andrea Kimi Antonelli', team: 'Mercedes', number: 12, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ANDANT01_Andrea_Kimi_Antonelli/andant01.png.transform/2col/image.png' },
    { id: 9, name: 'Fernando Alonso', team: 'Aston Martin', number: 14, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png' },
    { id: 10, name: 'Lance Stroll', team: 'Aston Martin', number: 18, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png' },
    { id: 11, name: 'Pierre Gasly', team: 'Alpine', number: 10, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col/image.png' },
    { id: 12, name: 'Franco Colapinto', team: 'Alpine', number: 43, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png.transform/2col/image.png' },
    { id: 13, name: 'Alexander Albon', team: 'Williams', number: 23, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col/image.png' },
    { id: 14, name: 'Carlos Sainz', team: 'Williams', number: 55, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png' },
    { id: 15, name: 'Liam Lawson', team: 'RB', number: 30, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png.transform/2col/image.png' },
    { id: 16, name: 'Arvid Lindblad', team: 'RB', number: 41, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ARVLIN01_Arvid_Lindblad/arvlin01.png.transform/2col/image.png' },
    { id: 17, name: 'Nico Hulkenberg', team: 'Audi', number: 27, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col/image.png' },
    { id: 18, name: 'Gabriel Bortoleto', team: 'Audi', number: 5, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png.transform/2col/image.png' },
    { id: 19, name: 'Esteban Ocon', team: 'Haas', number: 31, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col/image.png' },
    { id: 20, name: 'Oliver Bearman', team: 'Haas', number: 87, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png.transform/2col/image.png' },
    { id: 21, name: 'Sergio Perez', team: 'Cadillac', number: 11, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png' },
    { id: 22, name: 'Valtteri Bottas', team: 'Cadillac', number: 77, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png.transform/2col/image.png' }
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
