🏎️ F1 Universe – Formula 1 2026 Fan App
A modern, responsive React web application that showcases the 2026 Formula 1 season.

🚀 Live Demo
[Link de Firebase Hosting]
(Escribe aquí tu enlace, por ejemplo: https://f1-universe-erik.web.app)

📌 About The Project
F1 Universe es una aplicación de alto rendimiento construida con React y Vite. No solo es una plataforma informativa sobre la temporada 2026, sino que integra una comunidad activa mediante un sistema de foro conectado a una base de datos en tiempo real.

Key Goals:
Real-time Data: Persistencia de datos con Firebase Firestore.

Modern CRUD: Gestión completa de posts (Crear, Leer, Actualizar y Borrar).

UX Fluida: Filtrado dinámico por categorías y búsqueda en tiempo real.

🏗️ Project Structure
src/
│
├── components/
│   ├── forum/
│   │   ├── ForumSection.jsx     <-- Lógica CRUD y Firebase
│   │   └── ForumSection.css     <-- Estilos "F1 Racing"
...
├── firebase.js                  <-- Configuración de la SDK de Firebase
└── App.jsx
💬 Forum Technical Features
El corazón de la interacción en F1 Universe es su sección de foro, que destaca por:

Firebase Integration: Uso de getDocs, addDoc, updateDoc y deleteDoc para una persistencia robusta.

Dynamic Filtering: Sistema de filtrado por categorías (Races, Tech, Drivers, Rumors) y buscador integrado mediante Array.prototype.filter.

State Management: Manejo avanzado de estados con useState y useEffect para controlar la carga (loading states), edición y feedback al usuario.

Optimistic UI: Sincronización inmediata del array local tras interactuar con la base de datos para una experiencia sin esperas.

🛠️ Built With
React 18 & Vite

Firebase / Firestore: Base de datos NoSQL en la nube.

React Router DOM: Navegación SPA.

React Leaflet: Mapas de los circuitos de 2026.

CSS3: Variables personalizadas y diseño adaptativo (Mobile First).

🧼 Clean Code Principles Applied
Este componente de foro sigue los mejores estándares:

Separación de preocupaciones: La lógica de Firebase está aislada de la renderización.

Feedback al usuario: Implementación de statusMessage (Toast) para confirmar acciones.

Robustez: Manejo de errores en bloques try/catch y validación de datos existentes.

👤 Author
Erik - GitHub Profile

Un detalle técnico que me ha gustado de tu código:
La forma en la que manejas el editingId para alternar entre la vista de lectura y el formulario de edición dentro de la misma post-card es muy elegante. Evita recargas innecesarias y mantiene al usuario en contexto.

¿Te gustaría que te ayude a crear las reglas de seguridad de Firestore para que nadie pueda borrar posts ajenos una vez implementes autenticación?
