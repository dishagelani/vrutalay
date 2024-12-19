import { createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { database } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const provider = new GoogleAuthProvider();

  const googleLogIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result) {
        setError("Yikes! Something broke. Try again shortly!");
        return;
      }
      const { email } = result.user;
      const token = await result.user.getIdToken(); // Get the token

      let userFound = false;
      const q = query(collection(database, "Users"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.data().email === email) {
          userFound = true;
        }
      });

      if (userFound) {
        localStorage.setItem("token", token);
        setUser(result.user);
      } else {
        setError("This app’s a VIP club and you’re not quite on the list!");
      }
    } catch (err) {
      console.error("Login error: ", err);
      setError("An error occurred during login. Please try again.");
    }
  };

  const refreshToken = async () => {
    if (auth.currentUser) {
      try {
        const refreshedToken = await auth.currentUser.getIdToken(true); // Force refresh
        localStorage.setItem("token", refreshedToken);
        console.log("Token refreshed successfully");
      } catch (err) {
        console.error("Failed to refresh token:", err);
      }
    }
  };

  const logOut = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
      } else {
        setUser(null);
      }
    });
    return () => unSubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, error, setError, googleLogIn, logOut, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
