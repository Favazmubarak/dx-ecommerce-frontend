import { Navigate } from "react-router-dom";

function PublicRoute({ children, auth }) {
  if (auth) {
    if (auth.role === "admin") return <Navigate to="/admin" replace />;
    if (auth.role === "user") return <Navigate to="/" replace />;
  }
  
  return children;
}

export default PublicRoute;
 