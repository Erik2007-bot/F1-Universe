import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <div className="contact-container">
                <div className="contact-form-wrapper">
                    <h2>Send us a Message</h2>
                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="your@email.com" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows="5" placeholder="How can we help?" required></textarea>
                        </div>
                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </div>

                <div className="contact-info">
                    <h2>Our Location</h2>
                    <p>El Rincón, Las Palmas de Gran Canaria</p>
                    <div className="map-embed">
                        <iframe
                            width="100%"
                            height="300"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-15.455%2C28.125%2C-15.430%2C28.145&amp;layer=mapnik&amp;marker=28.130%2C-15.445"
                            title="El Rincón Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
