import './News.css';

const newsFeeds = [
    {
        id: 1,
        title: "Formula 1 Official Feed",
        description: "Últimas noticias oficiales directamente desde la web de la F1.",
        url: "https://www.formula1.com/en/latest/all.xml"
    },
    {
        id: 2,
        title: "Sky Sports F1 News",
        description: "Cobertura completa y análisis detallado de la categoría reina.",
        url: "https://www.skysports.com/rss/12433"
    },
    {
        id: 3,
        title: "Motorsport.com F1 Feed",
        description: "Noticias de última hora y reportajes técnicos sobre los monoplazas.",
        url: "https://www.motorsport.com/rss/f1/news/"
    }
];

const News = () => {
    return (
        <div className="news-page">
            <header className="news-header">
                <h1>F1 News & RSS Feeds</h1>
                <p>Mantente al día con toda la información y feeds RSS de la categoría reina.</p>
            </header>

            <div className="rss-container">
                {newsFeeds.map(feed => (
                    <div key={feed.id} className="rss-card">
                        <div className="rss-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.18,15.64A2.18,2.18,0,0,1,8.36,17.82,2.18,2.18,0,1,1,6.18,15.64m-4,4.22c.11-4.71,2.38-9.04,6-11.75a2.18,2.18,0,0,1,3.47.79c.14.3.26.63.31,1a12.19,12.19,0,0,0-5.8,5.82,2.18,2.18,0,0,1,1.15,3.77A14.22,14.22,0,0,0,2.18,19.86M2.18,3.3A20.7,20.7,0,0,1,22.88,24H20.7A18.52,18.52,0,0,0,2.18,5.48V3.3Z" />
                            </svg>
                        </div>
                        <div className="rss-info">
                            <h2>{feed.title}</h2>
                            <p>{feed.description}</p>
                            <a href={feed.url} target="_blank" rel="noopener noreferrer" className="rss-link">
                                Ver Feed RSS
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <section className="rss-info-section">
                <h3>¿Qué es un Feed RSS?</h3>
                <p>
                    RSS (Really Simple Syndication) es un formato que te permite recibir noticias y actualizaciones
                    de tus sitios web favoritos de forma automática sin tener que visitarlos uno por uno.
                    Puedes usar un lector de RSS para agrupar todas estas noticias en un solo lugar.
                </p>
            </section>
        </div>
    );
};

export default News;
