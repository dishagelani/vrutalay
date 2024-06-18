import { createContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"
const AuthContext = createContext()




const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const provider = new GoogleAuthProvider();

    const googleLogIn = async () => {
        const result = await signInWithPopup(auth, provider)
        if (!result) {
            alert("Something went wrong. Please try agian later !");
            return
        }
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem('token', token)

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
        <AuthContext.Provider value={{ user, googleLogIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };

