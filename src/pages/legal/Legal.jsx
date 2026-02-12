import './Legal.css';

const Legal = () => {
    return (
        <div className="legal-page">
            <div className="legal-container">
                <h1>Información Legal</h1>

                <section id="privacy" className="legal-section">
                    <h2>Política de Privacidad y Cookies</h2>
                    <p>
                        En <strong>F1 Universe</strong>, nos tomamos muy en serio su privacidad. Esta política describe cómo recopilamos, usamos y protegemos su información personal.
                    </p>
                    <h3>1. Recopilación de Información</h3>
                    <p>
                        Recopilamos información que usted nos proporciona directamente, como cuando se suscribe a nuestro boletín o se pone en contacto con nosotros. Esta información puede incluir su nombre, dirección de correo electrónico y cualquier otro dato que decida compartir.
                    </p>
                    <h3>2. Uso de Cookies</h3>
                    <p>
                        Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Las cookies son pequeños archivos de texto que se almacenan en su dispositivo. Utilizamos cookies para:
                    </p>
                    <ul>
                        <li>Recordar sus preferencias de navegación.</li>
                        <li>Analizar el tráfico del sitio web y el comportamiento del usuario.</li>
                        <li>Personalizar el contenido y los anuncios.</li>
                    </ul>
                    <p>
                        Puede controlar y administrar las cookies a través de la configuración de su navegador. Tenga en cuenta que deshabilitar las cookies puede afectar la funcionalidad de nuestro sitio.
                    </p>
                    <h3>3. Protección de Datos</h3>
                    <p>
                        Implementamos medidas de seguridad para proteger su información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción.
                    </p>
                </section>

                <hr className="legal-divider" />

                <section id="terms" className="legal-section">
                    <h2>Condiciones de Venta</h2>
                    <p>
                        Estas condiciones rigen la venta de productos y servicios a través de <strong>F1 Universe</strong>. Al realizar una compra, usted acepta estos términos.
                    </p>
                    <h3>1. Pedidos y Precios</h3>
                    <p>
                        Todos los pedidos están sujetos a disponibilidad. Nos reservamos el derecho de rechazar cualquier pedido. Los precios están indicados en la moneda local e incluyen los impuestos aplicables, a menos que se indique lo contrario.
                    </p>
                    <h3>2. Envíos y Entregas</h3>
                    <p>
                        Nos esforzamos por enviar los pedidos dentro de los plazos estimados. Sin embargo, los tiempos de entrega pueden variar debido a factores fuera de nuestro control. No somos responsables de retrasos causados por terceros.
                    </p>
                    <h3>3. Devoluciones y Reembolsos</h3>
                    <p>
                        Si no está satisfecho con su compra, puede solicitar una devolución dentro de los 30 días posteriores a la recepción del producto. El producto debe estar en su estado original. Los reembolsos se procesarán a través del método de pago original.
                    </p>
                    <h3>4. Propiedad Intelectual</h3>
                    <p>
                        Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos e imágenes, es propiedad de F1 Universe o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Legal;
