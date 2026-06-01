import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAItrL00LQ-n98MnovYhqmrgSWhlGcKqgU",
  authDomain: "controlgastos-c1b35.firebaseapp.com",
  projectId: "controlgastos-c1b35",
  storageBucket: "controlgastos-c1b35.firebasestorage.app",
  messagingSenderId: "568802086424",
  appId: "1:568802086424:web:ec4d95b77b44b1e71b7d6d",
  measurementId: "G-33MKH324W2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Colección principal
export const transactionsCol = collection(db, "transactions");

// Utilidades para operaciones CRUD

export const addTransaction = async (transaction) => {
  try {
    const docRef = await addDoc(transactionsCol, {
      ...transaction,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error al guardar en Firebase: " + e.message + "\n\n¿Activaste Cloud Firestore y configuraste las Reglas (Rules) en tu consola de Firebase?");
    return null;
  }
};

export const deleteTransactionDb = async (id) => {
  try {
    await deleteDoc(doc(db, "transactions", id));
    return true;
  } catch (e) {
    console.error("Error deleting document: ", e);
    return false;
  }
};

// Colecciones adicionales
export const budgetsCol = collection(db, "budgets");
export const subscriptionsCol = collection(db, "subscriptions");

// Función helper para añadir o actualizar presupuesto
export const setBudget = async (budgetData) => {
  try {
    const docRef = await addDoc(budgetsCol, {
      ...budgetData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error setting budget: ", error);
    throw error;
  }
};

export const addSubscription = async (subData) => {
  try {
    const docRef = await addDoc(subscriptionsCol, {
      ...subData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding sub: ", error);
    throw error;
  }
};

export const deleteSubscriptionDb = async (id) => {
  try {
    await deleteDoc(doc(db, "subscriptions", id));
  } catch (error) {
    console.error("Error deleting sub: ", error);
    throw error;
  }
};

// Exportamos utilidades para escuchar los cambios
export { onSnapshot, query, where, orderBy };
export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, db, deleteDoc, doc };
