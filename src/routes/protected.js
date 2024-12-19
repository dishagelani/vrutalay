import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import Loader from "../components/loader";

const Protected = () => {
  const { refreshToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        await refreshToken();
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Token validation failed:", err);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    validateToken();
  }, [refreshToken]);

  if (isLoading) {
    return <Loader/>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default Protected;
