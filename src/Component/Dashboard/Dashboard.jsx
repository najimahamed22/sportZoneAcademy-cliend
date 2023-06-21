import { NavLink, Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import NavBar from "../Shared/NavBar";
import useAuth from "../../hooks/useAuth";
import { BallTriangle } from "react-loader-spinner";
import useRole from "../../hooks/useRole";
import { FaHome, FaPlus, FaUser, FaHistory } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { role: userRole } = useRole();
  console.log(user);

  if (loading) {
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
    <>
      <Helmet>
        <title>SZA | Dashboard</title>
      </Helmet>
      {loading ? (
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
      ) : (
        <>
          <NavBar></NavBar>
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              <Outlet></Outlet>

              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden">
                Open drawer
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <ul className="menu p-4 flex flex-col items-start  w-80 h-full text-sky-400 bg-slate-900 text-2xl">
                <div className="w-full">
                  <img
                    className="object-cover mx-auto w-24 h-24 border-[#571ce057] shadow-blue-100 shadow border-2  rounded-full"
                    src={user?.photoURL}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                  />
                  <h2 className="text-white text-center my-5">
                    {user.displayName}
                  </h2>
                  <hr className="my-5 w-full" />
                </div>

                <div className="w-full">
                  {userRole === "admin" && (
                    <div className="flex flex-col">
                      <NavLink
                        to="/dashboard/manage-classes"
                        exact="true"
                        className="p-3 flex">
                        <FaPlus className="mr-2 mt-1" /> Manage Classes
                      </NavLink>

                      <NavLink
                        to="/dashboard/manage-users"
                        exact="true"
                        className="p-3 flex">
                        <FaUser className="mr-2 mt-1" /> Manage Users
                      </NavLink>
                    </div>
                  )}
                  {userRole === "instructor" && (
                    <div className="flex flex-col">
                      <NavLink
                        to="/dashboard/add-class"
                        exact="true"
                        className="p-3 flex">
                        <FaPlus className="mr-3 mt-1" /> Add Class
                      </NavLink>

                      <NavLink
                        to="/dashboard/my-classes"
                        exact="true"
                        className="p-3 flex">
                        <FaHistory className="mr-2 mt-1" /> My Classes
                      </NavLink>
                    </div>
                  )}
                  {userRole === "student" && (
                    <div className="flex flex-col">
                      <NavLink
                        to="/dashboard/my-selected-classes"
                        exact="true"
                        className="p-3 flex">
                        <FaHistory className="mr-2 mt-1" /> My Selected Classes
                      </NavLink>
                      <NavLink
                        to="/dashboard/my-enrolled-classes"
                        exact="true"
                        className="p-3 flex">
                        <FaHistory className="mr-2 mt-1" /> My Enrolled Classes
                      </NavLink>
                      <NavLink
                        to="/dashboard/payment-history"
                        exact="true"
                        className="p-3 flex">
                        <FaHistory className="mr-2 mt-1" /> Payment History
                      </NavLink>
                    </div>
                  )}
                  <hr className="my-5" />
                </div>
                <NavLink to="/" className="p-3 flex">
                  <FaHome className="mr-2 mt-1" /> Home
                </NavLink>
              </ul>
            </div>
          </div>
          <Footer></Footer>{" "}
        </>
      )}
    </>
  );
};

export default Dashboard;
