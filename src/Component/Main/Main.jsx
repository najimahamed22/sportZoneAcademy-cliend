import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";
import Footer from "../Shared/Footer";
import useAuth from "../../hooks/useAuth";
import { BallTriangle } from "react-loader-spinner";

const Main = () => {
  const { loading, theme } = useAuth();

  if (loading) {
    // Render a loading state or spinner while the user data is being loaded
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
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <NavBar></NavBar>
        <div className={`flex-1 h-full ${theme}`}>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
