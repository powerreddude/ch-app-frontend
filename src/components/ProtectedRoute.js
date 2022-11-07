import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute({ authed, redirectPath, children }) {

  if (!authed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />
}