import { createContext, useState } from "react";
import { database } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy } from "firebase/firestore";

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const addTaskToFirestore = async (task) => {
        try {
            await addDoc(collection(database, "Tasks"), {
                task,
                completed: false
            });
        } catch (e) {
            setError("Yikes! Something broke. Try again shortly!");
        }
    };

    const deleteTaskInFirestore = async (id) => {
        try {
            await deleteDoc(doc(database, "Tasks", id));
        } catch (e) {
            setError("Yikes! Something broke. Try again shortly!");
        }
    };
    const deleteCompletedTaskInFirestore = async (id) => {
        try {
            const q = query(collection(database, 'Tasks'), where('completed', '==', true));

            const querySnapshot = await getDocs(q);

            const deletePromises = querySnapshot.docs.map(docSnap => {
                const docRef = doc(database, 'Tasks', docSnap.id);
                return deleteDoc(docRef);
            });

            await Promise.all(deletePromises);

        } catch (e) {
            setError("Yikes! Something broke. Try again shortly!");
        }
    };

    const setTaskAsCompleteInFirestore = async (id) => {
        try {
            const ref = doc(database, "Tasks", id);

            await updateDoc(ref, {
                completed: true
            });
        } catch (e) {
            setError("Yikes! Something broke. Try again shortly!");
        }
    };


    const getAllTasksFromFirestore = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, "Tasks"));
            return querySnapshot
        } catch (e) {
            setError("Yikes! Something broke. Try again shortly!");
        }
    };
    
    const addProductToFirestore = async (product) => {
        try {
            await addDoc(collection(database, "Homeware"), {
                ...product
            });
        } catch (e) {
            console.log("error : ", e.message)
            setError("Yikes! Something broke. Try again shortly!");
        }
    };

    const deleteProductInFirestore = async (id) => {
        try {
            await deleteDoc(doc(database, "Homeware", id));
        } catch (e) {
            console.log("error : ", e.message)
            setError("Yikes! Something broke. Try again shortly!");
        }
    };

    const setProductStatusInFirestore = async (id, status) => {
        try {
            const ref = doc(database, "Homeware", id);

            await updateDoc(ref, {
                fromIndia: status
            });

        } catch (e) {
            console.log("error : ", e.message)
            setError("Yikes! Something broke. Try again shortly!");
        }
    };

    const updateIndexOfProductsInFirestore = async (finalIndex) => {
        finalIndex.forEach(async ({ id, index }) => {
            try {
                const ref = doc(database, "Homeware", id);

                await updateDoc(ref, {
                    index: index
                });;
            } catch (error) {
                console.error(`Error updating document with ID ${id}:`, error);
            }
        });
    }
    const getAllProductsFromFirestore = async () => {
        try {
            const documents = await getDocs(query(
                collection(database, "Homeware"),
                orderBy('index', 'asc'))
            );
            return documents
        } catch (e) {
            console.log("error : ", e.message)
            setError("Yikes! Something broke. Try again shortly!");
        }
    };

    return (
        <TodoContext.Provider value={{ addTaskToFirestore, setTaskAsCompleteInFirestore, deleteTaskInFirestore, deleteCompletedTaskInFirestore, getAllTasksFromFirestore, getAllProductsFromFirestore, setProductStatusInFirestore, updateIndexOfProductsInFirestore, deleteProductInFirestore, addProductToFirestore, error, setError }}>
            {children}
        </TodoContext.Provider>
    );
};

export { TodoContext, TodoContextProvider };