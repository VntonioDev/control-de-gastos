import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, where, orderBy, updateDoc, enableIndexedDbPersistence } from "firebase/firestore";
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

// Habilitar persistencia offline
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    console.warn('Multiple tabs open, offline persistence disabled');
  } else if (err.code == 'unimplemented') {
    console.warn('Browser does not support offline persistence');
  }
});

export const auth = getAuth(app);

// Colecciones
export const transactionsCol = collection(db, "transactions");
export const budgetsCol = collection(db, "budgets");
export const subscriptionsCol = collection(db, "subscriptions");
export const goalsCol = collection(db, "goals");
export const accountsCol = collection(db, "accounts");

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

export const updateTransactionDb = async (id, newData) => {
  try {
    await updateDoc(doc(db, "transactions", id), newData);
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
    return false;
  }
};

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

export const addGoal = async (goalData) => {
  try {
    const docRef = await addDoc(goalsCol, {
      ...goalData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding goal: ", error);
    throw error;
  }
};

// Exportamos utilidades para escuchar los cambios
export const deleteGoalDb = async (id) => {
  return await deleteDoc(doc(db, "goals", id));
};

export const addAccount = async (accountData) => {
  try {
    const docRef = await addDoc(accountsCol, {
      ...accountData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding account: ", error);
    throw error;
  }
};

export const deleteAccountDb = async (id) => {
  return await deleteDoc(doc(db, "accounts", id));
};

export { onSnapshot, query, where, orderBy, updateDoc };
export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, deleteDoc, doc };
