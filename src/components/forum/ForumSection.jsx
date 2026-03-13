import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import './ForumSection.css';

const ForumSection = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const [newPost, setNewPost] = useState({ titulo: '', contenido: '', Categoria: 'General' });

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ titulo: '', contenido: '' });
    const [statusMessage, setStatusMessage] = useState('');

    const categories = ['All', 'General', 'Races', 'Tech', 'Drivers', 'Rumors'];

    // 1. LEER DATOS
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'posts'));
            const postsList = snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().titulo,
                content: doc.data().contenido,
                category: doc.data().Categoria,
                date: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleDateString() : 'Reciente',
                author: doc.data().author || "Fan de F1"
            }));
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

    // Función para mostrar mensajes
    const showStatus = (msg) => {
        setStatusMessage(msg);
        setTimeout(() => setStatusMessage(''), 3000);
    };

    // 2.(CREATE)
    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const postData = {
                titulo: newPost.titulo,
                contenido: newPost.contenido,
                Categoria: newPost.Categoria,
                createdAt: new Date(),
                author: "Usuario F1"
            };

            const docRef = await addDoc(collection(db, 'posts'), postData);

            // Sincronización del Array JSON local
            const newPostObject = {
                id: docRef.id,
                title: postData.titulo,
                content: postData.contenido,
                category: postData.Categoria,
                date: new Date().toLocaleDateString(),
                author: postData.author
            };

            setPosts([newPostObject, ...posts]);
            setNewPost({ titulo: '', contenido: '', Categoria: 'General' });
            showStatus("¡Post publicado con éxito!");
        } catch (error) {
            console.error(error);
        }
    };

    // 3.(UPDATE)
    const startEditing = (post) => {
        setEditingId(post.id);
        setEditForm({ titulo: post.title, contenido: post.content });
    };

    const handleUpdatePost = async (id) => {
        try {
            const postRef = doc(db, 'posts', id);
            await updateDoc(postRef, {
                titulo: editForm.titulo,
                contenido: editForm.contenido
            });

            // Sincronización del Array JSON local
            setPosts(posts.map(p =>
                p.id === id ? { ...p, title: editForm.titulo, content: editForm.contenido } : p
            ));

            setEditingId(null);
            showStatus("Post actualizado correctamente");
        } catch (error) {
            console.error(error);
        }
    };

    // 4.DELETE
    const handleDeletePost = async (id) => {
        try {
            await deleteDoc(doc(db, 'posts', id));
            // Sincronización del Array JSON local
            setPosts(posts.filter(p => p.id !== id));
            showStatus("Post eliminado del sistema");
        } catch (error) {
            console.error(error);
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = (post.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (post.content?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section id="forum" className="forum-section">
            {/* Mensaje de estado*/}
            {statusMessage && <div className="status-toast">{statusMessage}</div>}

            <header className="forum-header">
                <h1>F1 Community Forum</h1>
                <p>Comenta la actualidad de la categoría reina.</p>
            </header>

            <div className="create-post-wrapper">
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
            </div>

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

                                {editingId === post.id ? (
                                    <div className="edit-mode-container">
                                        <input
                                            type="text"
                                            value={editForm.titulo}
                                            onChange={(e) => setEditForm({ ...editForm, titulo: e.target.value })}
                                            className="edit-input"
                                        />
                                        <textarea
                                            value={editForm.contenido}
                                            onChange={(e) => setEditForm({ ...editForm, contenido: e.target.value })}
                                            className="edit-textarea"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <h2>{post.title}</h2>
                                        <p>{post.content}</p>
                                    </>
                                )}
                            </div>

                            <div className="post-footer">
                                <span>Por: {post.author}</span>
                                <span>{post.date}</span>
                            </div>

                            <div className="post-actions">
                                {editingId === post.id ? (
                                    <>
                                        <button onClick={() => handleUpdatePost(post.id)} className="save-btn">Guardar</button>
                                        <button onClick={() => setEditingId(null)} className="cancel-btn">Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEditing(post)} className="edit-btn">Editar</button>
                                        <button onClick={() => handleDeletePost(post.id)} className="delete-btn">Borrar</button>
                                    </>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ForumSection;
