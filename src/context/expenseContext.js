import { createContext, useState } from "react";
import { database } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const ExpenseContext = createContext();

const ExpenseContextProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const addExpenseToFirestore = async (date, amount, description, category) => {
        try {
            const docRef = await addDoc(collection(database, "Expenses"), {
                date,
                amount,
                description,
                category,
            });
            console.log(docRef, "Added doc");
        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };

    const getAllExpensesFromFirestore = async () => {
        try {
            return await getDocs(collection(database, "Expenses"));
        } catch (e) {
            setError("Something went wrong. Please try again later !");
        }
    };

    return (
        <ExpenseContext.Provider value={{ addExpenseToFirestore, getAllExpensesFromFirestore, error, setError }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export { ExpenseContext, ExpenseContextProvider };