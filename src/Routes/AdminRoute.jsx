import { useLocation, Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import { BallTriangle } from "react-loader-spinner";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(role);

  if (loading || isLoading || !role) {
    return (
      <div className="flex h-screen justify-center items-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#1F2937"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
