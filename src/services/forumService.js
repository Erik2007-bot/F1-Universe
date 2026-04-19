import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import * as XLSX from 'xlsx';

const POSTS_COLLECTION = 'posts';

// --- 1. LECTURA DE DATOS (FIREBASE) ---
export const getPosts = async () => {
    try {
        const snapshot = await getDocs(collection(db, POSTS_COLLECTION));
        return snapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().titulo || doc.data().title || "Sin título",
            content: doc.data().contenido || doc.data().content || "Sin contenido",
            category: doc.data().Categoria || doc.data().categoria || "General",
            date: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleDateString() : '19/04/2026',
            author: doc.data().author || doc.data().autor || "Usuario F1"
        }));
    } catch (error) {
        console.error("Error al obtener posts:", error);
        return [];
    }
};

// --- 2. OPERACIONES DE FIREBASE (CREAR, BORRAR, EDITAR) ---
export const createPost = async (postData) => {
    const data = {
        titulo: postData.titulo || "Sin título",
        contenido: postData.contenido || "Sin contenido",
        Categoria: postData.Categoria || "General",
        author: postData.author || "Usuario F1",
        createdAt: new Date()
    };
    return await addDoc(collection(db, POSTS_COLLECTION), data);
};

export const deletePost = async (id) => {
    try {
        await deleteDoc(doc(db, POSTS_COLLECTION, id));
    } catch (error) {
        console.error("Error al eliminar:", error);
        throw error;
    }
};

export const updatePost = async (id, updatedData) => {
    await updateDoc(doc(db, POSTS_COLLECTION, id), updatedData);
};

// --- 3. FUNCIONES DE EXPORTACIÓN ---
const downloadFile = (content, fileName, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportPostsToJSON = async () => {
    const posts = await getPosts();
    downloadFile(JSON.stringify(posts, null, 4), 'f1_export.json', 'application/json');
};

export const exportPostsToCSV = async () => {
    const posts = await getPosts();
    const headers = 'titulo,contenido,categoria,autor,fecha';
    const rows = posts.map(p => `"${p.title}","${p.content}","${p.category}","${p.author}","${p.date}"`);
    downloadFile([headers, ...rows].join('\n'), 'f1_export.csv', 'text/csv');
};

export const exportPostsToXML = async () => {
    const posts = await getPosts();
    let xml = '<?xml version="1.0" encoding="UTF-8"?><posts>';
    posts.forEach(p => {
        xml += `<post><titulo>${p.title}</titulo><contenido>${p.content}</contenido><categoria>${p.category}</categoria><autor>${p.author}</autor></post>`;
    });
    xml += '</posts>';
    downloadFile(xml, 'f1_export.xml', 'application/xml');
};

// NUEVA FUNCIÓN: EXPORTAR A EXCEL (.XLSX)
export const exportPostsToExcel = async () => {
    const posts = await getPosts();
    if (!posts.length) return alert("No hay datos para exportar.");

    const dataToExport = posts.map(p => ({
        Titulo: p.title,
        Contenido: p.content,
        Categoria: p.category,
        Autor: p.author,
        Fecha: p.date
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Posts F1");
    XLSX.writeFile(workbook, "f1_forum_export.xlsx");
};

// NUEVA FUNCIÓN: EXPORTAR A LIBREOFFICE (.ODS)
export const exportPostsToODS = async () => {
    const posts = await getPosts();
    if (!posts.length) return alert("No hay datos para exportar.");

    const dataToExport = posts.map(p => ({
        Titulo: p.title,
        Contenido: p.content,
        Categoria: p.category,
        Autor: p.author,
        Fecha: p.date
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Posts F1");
    XLSX.writeFile(workbook, "f1_forum_export.ods");
};

// --- 4. FUNCIÓN DE IMPORTACIÓN MULTIFORMATO ---
export const importPostsFromFile = async (file) => {
    let importedData = [];
    try {
        if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.ods')) {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            importedData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        } else {
            const text = await file.text();
            if (file.name.endsWith('.json')) importedData = JSON.parse(text);
            else if (file.name.endsWith('.csv')) {
                const lines = text.split('\n').filter(line => line.trim() !== '').slice(1);
                importedData = lines.map(line => {
                    const v = line.split(',');
                    return {
                        titulo: v[0]?.replace(/"/g, ''),
                        contenido: v[1]?.replace(/"/g, ''),
                        categoria: v[2]?.replace(/"/g, ''),
                        autor: v[3]?.replace(/"/g, '')
                    };
                });
            } else if (file.name.endsWith('.xml')) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "text/xml");
                const postsNodes = xmlDoc.getElementsByTagName("post");
                importedData = Array.from(postsNodes).map(node => ({
                    titulo: node.getElementsByTagName("titulo")[0]?.textContent || "Sin título",
                    contenido: node.getElementsByTagName("contenido")[0]?.textContent || "Sin contenido",
                    categoria: node.getElementsByTagName("categoria")[0]?.textContent || "General",
                    autor: node.getElementsByTagName("autor")[0]?.textContent || "Usuario F1"
                }));
            }
        }

        for (const p of importedData) {
            await createPost({
                titulo: p.titulo || p.Titulo || p.title,
                contenido: p.contenido || p.Contenido || p.content,
                Categoria: p.categoria || p.Categoria || p.category,
                author: p.autor || p.Autor || p.author
            });
        }
        return importedData.length;
    } catch (error) {
        console.error("Error importando:", error);
        throw error;
    }
};