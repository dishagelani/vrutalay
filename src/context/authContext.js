import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"
import { database } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const provider = new GoogleAuthProvider();

    const loginWithEmailAndPassword = async (email, password) => {
        console.log("email and password", email, password);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log("Credentiasl", userCredential);
            if (!userCredential) {
                alert("You are not authorized to access the applicatioin !")
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('Email already in use !')
                    break;
                case 'auth/invalid-credential':
                    setError('You are not authorized to use the application !')
                    break;
                case 'auth/invalid-password':
                    setError('Invalid password !')
                    break;
                default: setError("Something went wrong. Please try again later !")
            }
        }

    }

    const googleLogIn = async () => {

        const result = await signInWithPopup(auth, provider)
        if (!result) {
            alert("Something went wrong. Please try agian later !");
            return
        }
        const { accessToken, email } = result.user
        // const credential = GoogleAuthProvider.credentialFromResult(result);

        let userFound = false

        const q = query(collection(database, "Users"));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => { if (doc.data().email == email) { userFound = true } })

        if (userFound) {
            localStorage.setItem('token', accessToken)
        } else {
            setError('You are not authorized to use the application !')
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
        <AuthContext.Provider value={{ user, error, setError, googleLogIn, logOut, loginWithEmailAndPassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };

