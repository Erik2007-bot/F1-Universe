import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import './Forum.css';

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'General', 'Races', 'Tech', 'Drivers', 'Rumors'];

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const postsCol = collection(db, 'posts');
                const snapshot = await getDocs(postsCol);
                const postsList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(postsList);
            } catch (error) {
                console.error("Error fetching posts: ", error);
                // Fallback for demo/empty state
                setPosts([
                    { id: '1', title: 'Welcome to the F1 Forum', content: 'Discuss anything about Formula 1 here!', category: 'General', author: 'Admin', date: '2026-02-25' },
                    { id: '2', title: '2026 Engine Regulations', content: 'What do you think about the new power units?', category: 'Tech', author: 'User123', date: '2026-02-24' },
                    { id: '3', title: 'Monaco GP Predictions', content: 'Who will take pole position this year?', category: 'Races', author: 'RaceFan', date: '2026-02-23' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="forum-page">
            <header className="forum-header">
                <h1>F1 Community Forum</h1>
                <p>Únete a la conversación con otros apasionados de la Fórmula 1.</p>
            </header>

            <div className="forum-controls">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar temas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
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
                <div className="loader">Cargando comunidad...</div>
            ) : (
                <div className="posts-container">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <article key={post.id} className="post-card">
                                <span className="post-category">{post.category}</span>
                                <h2>{post.title}</h2>
                                <p className="post-excerpt">{post.content}</p>
                                <div className="post-footer">
                                    <span className="post-author">Por: {post.author}</span>
                                    <span className="post-date">{post.date}</span>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No se encontraron temas coincidentes.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Forum;
