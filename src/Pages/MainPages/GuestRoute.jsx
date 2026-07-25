
import { Navigate } from 'react-router-dom';

export default function GuestRoute() {
   const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (token) {
    return <Navigate to="/admin" />;
  }

  return children;
  
}
