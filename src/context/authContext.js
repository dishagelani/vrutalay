import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"
import { database } from "../firebase";
import { collection, query, getDocs, addDoc } from "firebase/firestore";
import FormData from "form-data";
import Mailgun from "mailgun.js";
import CryptoJS from "crypto-js";

const AuthContext = createContext()

// const mailgun = new Mailgun(FormData).client({ username: 'api', key: process.env.REACT_APP_MAILGUN_API_KEY });

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const provider = new GoogleAuthProvider();


    const googleLogIn = async () => {

        const result = await signInWithPopup(auth, provider)
        if (!result) {
            setError("Yikes! 😕 Something broke. Try again shortly!");
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

            // await mailgun.messages.create(process.env.REACT_APP_MAILGUN_DOMAIN, {
            //     from: "nayanglass2024@gmail.com",
            //     to: ["dishagelani1999@gmail.com"],
            //     subject: "Authentication",
            //     html: `<div style="max-width: 24rem; padding: 1.5rem; background-color: white; border: 1px solid #E5E7EB; border-radius: 0.5rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"> 
            //                 <p style="margin-bottom: 0.75rem; font-weight: 400; color: #374151;">Provide access to ${displayName}</p>
            //                 <a href="${process.enc.REACT_APP_DOMAIN}/authorizeUser/${ CryptoJS.AES.encrypt(email, '159').toString().replace('/','$')}" target='_blank' style="display: inline-flex; align-items: center; padding: 0.75rem 1rem; font-size: 0.875rem; font-weight: 500; text-align: center; color: white; background-color: #1D4ED8; border-radius: 0.5rem; text-decoration: none; cursor: pointer">
            //                     Authorize
            //                 </a>
            //             </div>` })
            //     .then(msg => { console.log(msg); 
                    setError("This app’s a VIP club and you’re not quite on the list. Try again in a bit and maybe you’ll get a golden ticket! ")
                //  }) // logs response data
                // .catch(err => console.log("Error" , err.messages));

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

