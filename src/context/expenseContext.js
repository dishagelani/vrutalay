import { createContext, useState } from "react";
import { database } from "../firebase";
import { collection, addDoc, getDocs, updateDoc,deleteDoc, doc, getDoc, orderBy } from "firebase/firestore";

const ExpenseContext = createContext();

const ExpenseContextProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    const addExpenseToFirestore = async (data) => {
        try {
            const docRef = await addDoc(collection(database, "Expenses"), {
                ...data
            });
            console.log(docRef, "Added doc");
        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };
    const editExpenseInFirestore = async (data) => {
        try {
            const ref = doc(database, "Expenses", data.id);

            await updateDoc(ref, {
                ...data
            });
        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };
    const deleteExpenseInFirestore = async (id) => {
        try {
            await deleteDoc(doc(database, "Expenses", id));
        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };

    const getExpenseFromFirestore = async (id) => {
        try {
            const docRef = doc(database, "Expenses", id);
            const docSnap = await getDoc(docRef);

            return docSnap.data()

        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };
    const getAllExpensesFromFirestore = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, "Expenses"),orderBy("timestamp", "desc"));
           const documents =  querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              
              setTotalAmount(documents.reduce((accumulator, current) => {
                  return accumulator + Number(current.amount);
                }, 0))

            return documents
        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };

    return (
        <ExpenseContext.Provider value={{ totalAmount, addExpenseToFirestore,editExpenseInFirestore,deleteExpenseInFirestore, getExpenseFromFirestore, getAllExpensesFromFirestore, error, setError }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export { ExpenseContext, ExpenseContextProvider };