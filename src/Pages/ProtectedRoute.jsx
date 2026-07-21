import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    console.log(children);
    return children;
  } else {
    console.log("ارجع يالا");
    return <Navigate to="/login" />;
  }
}

