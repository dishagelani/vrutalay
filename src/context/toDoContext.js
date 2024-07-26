import { createContext, useState } from "react";
import { database } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc,  orderBy } from "firebase/firestore";

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
            setError("Something went wrong. Please try again later !");
        }
    };

    const deleteTaskInFirestore = async (id) => {
        try {
            await deleteDoc(doc(database, "Tasks", id));
        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };

    const setTaskAsCompleteInFirestore = async (id) => {
        try {
            const ref = doc(database, "Tasks", id);

            await updateDoc(ref, {
                completed: true
            });
        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };


    const getAllTasksFromFirestore = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, "Tasks"));
            return querySnapshot
        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };
    const addProductToFirestore = async (product) => {

        try {
            await addDoc(collection(database, "Homeware"), {
                ...product,priority : false
            });
        } catch (e) {
            console.log(e.message, "error");
            setError("Something went wrong. Please try again later !");
        }
    };

    const deleteProductInFirestore = async (id) => {
        try {
            await deleteDoc(doc(database, "Homeware", id));
        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };

    const setProductStatusInFirestore = async (id, status) => {
        try {

            console.log(id, status, "Status");
            const ref = doc(database, "Homeware", id);

            await updateDoc(ref, {
                fromIndia: status
            });

            console.log("hey")
        } catch (e) {

            console.log("error", e.message);
            setError("Something went wrong. Please try again later !");
        }
    };
   


    const getAllProductsFromFirestore = async () => {
        try {
            const documents = await getDocs(collection(database, "Homeware"));
            return documents
        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };

    return (
        <TodoContext.Provider value={{ addTaskToFirestore, setTaskAsCompleteInFirestore, deleteTaskInFirestore, getAllTasksFromFirestore, getAllProductsFromFirestore, setProductStatusInFirestore, deleteProductInFirestore, addProductToFirestore, error, setError }}>
            {children}
        </TodoContext.Provider>
    );
};

export { TodoContext, TodoContextProvider };