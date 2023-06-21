import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { BallTriangle } from "react-loader-spinner";

const InstructorRoute = ({ children }) => {
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

  if (user && role === "instructor") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default InstructorRoute;
