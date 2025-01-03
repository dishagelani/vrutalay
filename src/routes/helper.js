import { redirect } from "react-router-dom";
import { getWithExpiry } from "../utils";

export const isAuthenticated = async () => {
  const token = getWithExpiry("token");
  if (token) throw redirect("/");
  return null;
};
