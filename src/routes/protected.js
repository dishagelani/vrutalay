import { Navigate, Outlet } from "react-router-dom";
import { getWithExpiry } from "../utils";

const Protected = () => {
  const token = getWithExpiry("token");

  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default Protected;