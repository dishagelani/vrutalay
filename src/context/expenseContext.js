import { createContext, useState } from "react";
import { database } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc, orderBy, where, query } from "firebase/firestore";
import moment from "moment";

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
            setError("Yikes! Something broke. Try again shortly!");
        }
    };
    const editExpenseInFirestore = async (data) => {
        try {
            const ref = doc(database, "Expenses", data.id);

            await updateDoc(ref, {
                ...data
            });
        } catch (e) {
            setError("Yikes! Something broke. Try again shortly!");
        }
    };
    const deleteExpenseInFirestore = async (id) => {
        try {
            await deleteDoc(doc(database, "Expenses", id));
        } catch (e) {
            setError("Yikes! Something broke. Try again shortly!");
        }
    };

    const getExpenseFromFirestore = async (id) => {
        try {
            const docRef = doc(database, "Expenses", id);
            const docSnap = await getDoc(docRef);

            return docSnap.data()

        } catch (e) {
            setError("Yikes! Something broke. Try again shortly!");
        }
    };
    const getAllExpensesByMonthFromFirestore = async (month, year) => {
        try {
            const startOfMonth = moment(`${year}-${month}-01`).startOf('month').toDate();
            const endOfMonth = moment(startOfMonth).endOf('month').toDate();

            const q = query(
                collection(database, "Expenses"),
                where("date", ">=", startOfMonth),
                where("date", "<=", endOfMonth),
                orderBy("date", "desc")
            );

            const querySnapshot = await getDocs(q);
            // const querySnapshot = await getDocs(collection(database, "Expenses"), orderBy("timestamp", "desc"));
            const documents = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setTotalAmount(documents.reduce((accumulator, current) => {
                return accumulator + parseFloat(current.amount);
            }, 0))

            return documents
        } catch (e) {
            setError("Yikes! Something broke. Try again shortly!");
        }
    };
    const getAllExpensesByYearFromFirestore = async (year) => {
        try {

            const expensesRef = collection(database, 'Expenses');

            const startOfYear = moment.utc([year]).startOf('year').toDate();
            const endOfYear = moment.utc([year]).endOf('year').toDate();

            const q = query(
                expensesRef,
                where('date', '>=', startOfYear),
                where('date', '<=', endOfYear)
            );

            const querySnapshot = await getDocs(q);

            const documents = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setTotalAmount(documents.reduce((accumulator, current) => {
                return accumulator + parseFloat(current.amount);
            }, 0))

            return documents
        } catch (e) {
            setError("Yikes! Something broke. Try again shortly!");
        }
    };

    return (
        <ExpenseContext.Provider value={{ totalAmount, addExpenseToFirestore, editExpenseInFirestore, deleteExpenseInFirestore, getExpenseFromFirestore, getAllExpensesByMonthFromFirestore, getAllExpensesByYearFromFirestore, error, setError }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export { ExpenseContext, ExpenseContextProvider };