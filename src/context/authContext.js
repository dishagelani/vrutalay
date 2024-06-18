import { createContext, useState } from "react";


 const AuthContext = createContext()  



 const AuthContextProvider = ({children}) => {
   const [user,setUser] = useState(null) 
//    console.log("provider user", user);
    return  (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };

