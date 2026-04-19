import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const POSTS_COLLECTION = 'posts';

// --- FUNCIÓN PARA OBTENER DATOS (LECTURA) ---
export const getPosts = async () => {
    try {
        const snapshot = await getDocs(collection(db, POSTS_COLLECTION));

        // Debug para ver en consola si Firebase responde
        console.log("¿La colección está vacía?", snapshot.empty);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            console.log("Datos brutos del documento:", data);

            // Mapeo exacto basado en la estructura real de tu Firestore
            return {
                id: doc.id,
                title: data.titulo || data.title || "Sin título",
                content: data.contenido || data.content || "Sin contenido",
                category: data.Categoria || data.categoria || data.category || "General",
                date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : '19/04/2026',
                author: data.author || data.autor || "Usuario F1"
            };
        });
    } catch (error) {
        console.error("Error al obtener posts de Firebase: ", error);
        return [];
    }
};

// --- FUNCIONES DE ESCRITURA / MODIFICACIÓN ---
export const createPost = async (postData) => {
    try {
        const normalizedData = {
            titulo: postData.titulo || "Sin título",
            contenido: postData.contenido || "Sin contenido",
            Categoria: postData.Categoria || "General",
            author: postData.author || "Usuario F1",
            createdAt: new Date()
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
        await updateDoc(postRef, updatedData);
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

// --- UTILIDADES DE DESCARGA ---
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

const escapeValue = (val) => {
    if (typeof val !== 'string') return val;
    return val.replace(/"/g, '""');
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

// --- FUNCIONES DE EXPORTACIÓN (CORREGIDAS CON AWAIT) ---
export const exportPostsToJSON = async () => {
    const posts = await getPosts();
    if (!posts || posts.length === 0) return alert("No hay datos en Firebase para exportar.");

    const exportData = posts.map(p => ({
        titulo: p.title,
        contenido: p.content,
        categoria: p.category,
        autor: p.author,
        fecha: p.date
    }));

    downloadFile(JSON.stringify(exportData, null, 4), 'f1_forum_export.json', 'application/json');
};

export const exportPostsToCSV = async () => {
    const posts = await getPosts();
    if (!posts || posts.length === 0) return alert("No hay datos para exportar.");

    const headers = 'titulo,contenido,categoria,autor,fecha';
    const rows = posts.map(p =>
        `"${escapeValue(p.title)}","${escapeValue(p.content)}","${p.category}","${p.author}","${p.date}"`
    );

    const csv = [headers, ...rows].join('\n');
    downloadFile(csv, 'f1_forum_export.csv', 'text/csv;charset=utf-8;');
};

export const exportPostsToXML = async () => {
    const posts = await getPosts();
    if (!posts || posts.length === 0) return alert("No hay datos para exportar.");

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
export const importPostsFromFile = async (file) => {
    const text = await file.text();
    let importedData = [];

    try {
        if (file.name.endsWith('.json')) {
            const data = JSON.parse(text);
            importedData = Array.isArray(data) ? data : [data];
        } else if (file.name.endsWith('.csv')) {
            const lines = text.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
            importedData = lines.slice(1).map(line => {
                const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
                const obj = {};
                headers.forEach((h, i) => {
                    obj[h] = (values[i] || '').replace(/^"|"$/g, '').replace(/""/g, '"').trim();
                });
                return obj;
            });
        } else if (file.name.endsWith('.xml')) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const items = xmlDoc.querySelectorAll('post, race');
            importedData = Array.from(items).map(item => ({
                titulo: item.querySelector('titulo, title')?.textContent || '',
                contenido: item.querySelector('contenido, content')?.textContent || '',
                categoria: item.querySelector('categoria, category')?.textContent || 'General',
                autor: item.querySelector('autor, author')?.textContent || 'Anonimo'
            }));
        }

        let count = 0;
        for (const p of importedData) {
            await addDoc(collection(db, POSTS_COLLECTION), {
                titulo: p.titulo || p.title || 'Sin título',
                contenido: p.contenido || p.content || 'Sin contenido',
                Categoria: p.categoria || p.category || 'General',
                author: p.autor || p.author || 'Importado',
                createdAt: new Date()
            });
            count++;
        }
        return count;
    } catch (error) {
        console.error("Error al importar el archivo:", error);
        throw error;
    }
};
