import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase'; // Verifica que esta ruta llegue a tu firebase.js
import './Forum.css';

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Estado para el formulario con los nombres de tu imagen
    const [newPost, setNewPost] = useState({ titulo: '', contenido: '', Categoria: 'General' });

    const categories = ['All', 'General', 'Races', 'Tech', 'Drivers', 'Rumors'];

    // 1. LEER DATOS (FETCH)
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const postsCol = collection(db, 'posts');
            // Traemos los documentos
            const snapshot = await getDocs(postsCol);

            const postsList = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    // Mapeamos los nombres exactos de tu imagen de Firestore
                    title: data.titulo,
                    content: data.contenido,
                    category: data.Categoria,
                    // Convertimos la fecha de Firestore a algo legible
                    date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Reciente',
                    author: data.author || "Fan de F1"
                };
            });
            setPosts(postsList);
        } catch (error) {
            console.error("Error al obtener posts: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // 2. ESCRIBIR DATOS (ADD)
    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPost.titulo || !newPost.contenido) return;

        try {
            await addDoc(collection(db, 'posts'), {
                titulo: newPost.titulo,
                contenido: newPost.contenido,
                Categoria: newPost.Categoria,
                createdAt: new Date(), // Esto genera el campo que vimos en tu imagen
                author: "Usuario F1"
            });

            setNewPost({ titulo: '', contenido: '', Categoria: 'General' }); // Limpiar
            fetchPosts(); // Recargar la lista
            alert("¡Post publicado en F1 Universe!");
        } catch (error) {
            console.error("Error al guardar: ", error);
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = (post.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (post.content?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="forum-page">
            <header className="forum-header">
                <h1>F1 Community Forum</h1>
                <p>Comenta la actualidad de la categoría reina.</p>
            </header>

            {/* FORMULARIO PARA ESCRIBIR */}
            <section className="create-post-section">
                <form onSubmit={handleCreatePost} className="forum-form">
                    <h3>¿Qué tienes en mente?</h3>
                    <input
                        type="text"
                        placeholder="Título (ej: ¡Alonso al podio!)"
                        value={newPost.titulo}
                        onChange={(e) => setNewPost({ ...newPost, titulo: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Escribe aquí tu contenido..."
                        value={newPost.contenido}
                        onChange={(e) => setNewPost({ ...newPost, contenido: e.target.value })}
                        required
                    />
                    <div className="form-footer">
                        <select
                            value={newPost.Categoria}
                            onChange={(e) => setNewPost({ ...newPost, Categoria: e.target.value })}
                        >
                            {categories.filter(c => c !== 'All').map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <button type="submit" className="submit-btn">Enviar Post</button>
                    </div>
                </form>
            </section>

            <div className="forum-controls">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="loader">Calentando motores...</div>
            ) : (
                <div className="posts-container">
                    {filteredPosts.map(post => (
                        <article key={post.id} className="post-card">
                            <div className="post-content-wrapper">
                                <span className="post-category">{post.category}</span>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                            </div>
                            <div className="post-footer">
                                <span>Por: {post.author}</span>
                                <span>{post.date}</span>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Forum;
