import { createContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"
import { database } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const provider = new GoogleAuthProvider();


    const googleLogIn = async () => {

        const result = await signInWithPopup(auth, provider)
        if (!result) {
            setError("Yikes! Something broke. Try again shortly!");
            return
        }
        const {  email }= result.user

        const idToken = await result.user.getIdToken();

        // const credential = GoogleAuthProvider.credentialFromResult(result);

        let userFound = false

        const q = query(collection(database, "Users"));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => { if (doc.data().email == email) { userFound = true } })

        if (userFound) {
            localStorage.setItem('token', idToken)
        } else {
            setError("This app’s a VIP club and you’re not quite on the list! ")
        }
    }

    const logOut = async () => {
        await signOut(auth)
        localStorage.removeItem('token')
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            if (user) setUser(user);

        });
        return () => unSubscribe();
    }, []);



    return (
        <AuthContext.Provider value={{ user, error, setError, googleLogIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };