import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const POSTS_COLLECTION = 'posts';

export const getPosts = async () => {
    try {
        const snapshot = await getDocs(collection(db, POSTS_COLLECTION));
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.titulo || data.title || "Sin título",
                content: data.contenido || data.content || "Sin contenido",
                category: data.Categoria || data.category || "General",
                date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Reciente',
                author: data.author || data.autor || "Fan de F1"
            };
        });
    } catch (error) {
        console.error("Error al obtener posts: ", error);
        throw error;
    }
};

export const createPost = async (postData) => {
    try {
        // Siempre guardamos en español para mantener consistencia en Firestore
        const normalizedData = {
            titulo: postData.titulo,
            contenido: postData.contenido,
            Categoria: postData.Categoria,
            author: postData.author || "Anónimo",
            createdAt: postData.createdAt || new Date()
        };
        const docRef = await addDoc(collection(db, POSTS_COLLECTION), normalizedData);
        return docRef;
    } catch (error) {
        console.error("Error al crear el post: ", error);
        throw error;
    }
};

export const updatePost = async (id, updatedData) => {
    try {
        const postRef = doc(db, POSTS_COLLECTION, id);
        // Normalizar a español antes de actualizar
        const normalizedUpdate = {};
        if (updatedData.titulo) normalizedUpdate.titulo = updatedData.titulo;
        if (updatedData.contenido) normalizedUpdate.contenido = updatedData.contenido;

        await updateDoc(postRef, normalizedUpdate);
    } catch (error) {
        console.error("Error al actualizar el post: ", error);
        throw error;
    }
};

export const deletePost = async (id) => {
    try {
        await deleteDoc(doc(db, POSTS_COLLECTION, id));
    } catch (error) {
        console.error("Error al eliminar el post: ", error);
        throw error;
    }
};

// --- FUNCIONES DE EXPORTACIÓN (EN ESPAÑOL) ---

const downloadFile = (content, fileName, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

// Escapa caracteres especiales para XML y CSV
const escapeValue = (val) => {
    if (typeof val !== 'string') return val;
    return val.replace(/"/g, '""'); // Para CSV
};

const escapeXml = (unsafe) => {
    if (typeof unsafe !== 'string') return unsafe;
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

export const exportPostsToJSON = async () => {
    const posts = await getPosts();
    const exportData = posts.map(p => ({
        titulo: p.title,
        contenido: p.content,
        categoria: p.category,
        autor: p.author,
        fecha: p.date
    }));
    const json = JSON.stringify(exportData, null, 4);
    downloadFile(json, 'f1_forum_export.json', 'application/json');
};

export const exportPostsToCSV = async () => {
    const posts = await getPosts();
    const headers = 'titulo,contenido,categoria,autor,fecha';
    const rows = posts.map(p =>
        `"${escapeValue(p.title)}","${escapeValue(p.content)}","${p.category}","${p.author}","${p.date}"`
    );
    const csv = [headers, ...rows].join('\n');
    downloadFile(csv, 'f1_forum_export.csv', 'text/csv;charset=utf-8;');
};

export const exportPostsToXML = async () => {
    const posts = await getPosts();
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<posts>\n';
    posts.forEach(p => {
        xml += '  <post>\n';
        xml += `    <titulo>${escapeXml(p.title)}</titulo>\n`;
        xml += `    <contenido>${escapeXml(p.content)}</contenido>\n`;
        xml += `    <categoria>${p.category}</categoria>\n`;
        xml += `    <autor>${p.author}</autor>\n`;
        xml += `    <fecha>${p.date}</fecha>\n`;
        xml += '  </post>\n';
    });
    xml += '</posts>';
    downloadFile(xml, 'f1_forum_export.xml', 'application/xml');
};

// --- FUNCIONES DE IMPORTACIÓN ---

const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    return lines.slice(1).map(line => {
        // Maneja comillas en el CSV
        const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
        const obj = {};
        headers.forEach((h, i) => {
            obj[h] = (values[i] || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim();
        });
        return obj;
    });
};

const parseXML = (text) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const items = xml.querySelectorAll('post, race'); // Soporta ambas etiquetas para retrocompatibilidad
    return Array.from(items).map(item => ({
        titulo: item.querySelector('titulo, title, raceName')?.textContent || '',
        contenido: item.querySelector('contenido, content, circuit')?.textContent || '',
        categoria: item.querySelector('categoria, category')?.textContent || 'General',
        autor: item.querySelector('autor, author')?.textContent || 'Anonimo'
    }));
};

export const importPostsFromFile = async (file) => {
    const text = await file.text();
    let importedData = [];

    if (file.name.endsWith('.json')) {
        const data = JSON.parse(text);
        importedData = Array.isArray(data) ? data : [data];
    } else if (file.name.endsWith('.csv')) {
        importedData = parseCSV(text);
    } else if (file.name.endsWith('.xml')) {
        importedData = parseXML(text);
    } else {
        throw new Error('Formato no soportado. Usa JSON, CSV o XML.');
    }

    let count = 0;
    for (const p of importedData) {
        // Mapeo inteligente de campos (acepta tanto español como inglés del archivo)
        const titulo = p.titulo || p.title || p.raceName || 'Sin título';
        const contenido = p.contenido || p.content || (p.circuit ? `${p.circuit} - ${p.location}` : 'Sin contenido');
        const categoria = p.categoria || p.category || p.Categoria || (p.raceName ? 'Races' : 'General');
        const autor = p.autor || p.author || 'Importado';

        await addDoc(collection(db, POSTS_COLLECTION), {
            titulo: titulo,
            contenido: contenido,
            Categoria: categoria,
            author: autor,
            createdAt: new Date()
        });
        count++;
    }
    return count;
};
