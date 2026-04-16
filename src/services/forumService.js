import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const POSTS_COLLECTION = 'posts';

export const getPosts = async () => {
    try {
        const snapshot = await getDocs(collection(db, POSTS_COLLECTION));
        return snapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().titulo,
            content: doc.data().contenido,
            category: doc.data().Categoria,
            date: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleDateString() : 'Reciente',
            author: doc.data().author || "Fan de F1"
        }));
    } catch (error) {
        console.error("Error al obtener posts: ", error);
        throw error;
    }
};

export const createPost = async (postData) => {
    try {
        const docRef = await addDoc(collection(db, POSTS_COLLECTION), postData);
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
