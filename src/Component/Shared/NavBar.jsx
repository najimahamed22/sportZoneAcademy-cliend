import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { BallTriangle } from "react-loader-spinner";
import { useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const NavBar = () => {
  const { user, logOut, loading, handleToggleTheme } = useAuth();
  // console.log(user);
  const [isOpen, setIsOpen] = useState(false);
  const [modeIcon, setModeIcon] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleModeIcon = () => {
    setModeIcon(!modeIcon);
  };
  useEffect(() => {
    handleToggleTheme();
  }, []);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

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
    <nav
      className={`bg-slate-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-5`}>
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div className="inline-flex gap-5">
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzuQTrGWG_fzYmpGIOSVQq2mBKvaJ1UGWkEvLjqxJbP83Ngy07XXztApM-uWVXr6kX34&usqp=CAU"
              alt="Logo"
              className="h-16 w-16 rounded-full border-white  ml-2"
            />
          </Link>
          <Link
            to="/"
            className="text-white my-auto md:text-2xl sm:text-sm   font-bold">
            Sport Zone Academy
          </Link>
          <div className="mr-5 my-auto">
            <span
              title="Change Mode"
              className="text-[#FB834A] text-xl font-medium"
              onClick={handleToggleTheme}>
              <span onClick={handleModeIcon}>
                {modeIcon ? (
                  <button className="myBtn">
                    <MdLightMode size={22}></MdLightMode>
                  </button>
                ) : (
                  <button className="myBtn">
                    <MdDarkMode size={22}></MdDarkMode>
                  </button>
                )}
              </span>
            </span>
          </div>
        </div>
        <div className="sm:hidden">
          <button
            type="button"
            className="text-gray-500  hover:bg-sky-400 hover:text-slate-900  focus:outline-none text-2xl focus:text-white"
            aria-label="toggle menu"
            onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>
      </div>
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } sm:flex sm:items-center sm:w-auto`}>
        <div className="px-2 pt-2 text-white text-lg font-semibold pb-2 sm:flex">
          <NavLink
            to="/"
            exact="true"
            className="block px-2 py-1  rounded  hover:bg-sky-400 hover:text-slate-900  hover:rounded-lg sm:mt-0 sm:ml-2">
            Home
          </NavLink>

          <NavLink
            to="/instructors"
            exact="true"
            className="block px-2 py-1  hover:bg-sky-400 hover:text-slate-900  hover:rounded-lg sm:mt-0 sm:ml-2">
            Instructors
          </NavLink>
          <NavLink
            to="/classes"
            exact="true"
            className="block px-2 py-1  hover:bg-sky-400 hover:text-slate-900 hover:rounded-lg sm:mt-0 sm:ml-2">
            Classes
          </NavLink>
          <NavLink
            to="/dashboard"
            exact="true"
            className="block px-2 md:py-1  hover:bg-sky-400 hover:text-slate-900 hover:rounded-lg sm:mt-0 ">
            Dashboard
          </NavLink>
        </div>
      </nav>
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } sm:flex sm:items-center sm:w-auto`}>
        <div className="px-2 md:pt-2 text-white text-lg font-semibold pb-2 sm:flex">
          <div>
            {user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="h-12 w-15 rounded-full border-white border-2 ml-2"
                title={user.displayName || ""}
              />
            ) : (
              <></>
            )}
          </div>
          {user ? (
            <p>
              <button
                onClick={handleLogOut}
                className="block px-2 py-1  hover:bg-sky-400 hover:text-slate-900 hover:rounded-lg sm:mt-0 sm:ml-2">
                Logout
              </button>
            </p>
          ) : (
            <NavLink
              to="/login"
              exact="true"
              className="block px-2 py-1  hover:bg-sky-400 hover:text-slate-900 hover:rounded-lg sm:mt-0 sm:ml-2">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </nav>
  );
};

export default NavBar;

// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
// import useAuth from "../../hooks/useAuth";
// import { BallTriangle } from "react-loader-spinner";

// const NavBar = ({ toggleTheme }) => {
//   const { user, logOut, loading } = useAuth();
//   console.log(user);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };
//   const handleLogOut = () => {
//     logOut()
//       .then(() => {})
//       .catch((error) => console.log(error));
//   };

//   if (loading) {
//     // Render a loading state or spinner while the user data is being loaded
//     return (
//       <div className="flex h-screen justify-center items-center">
//         <BallTriangle
//           height={100}
//           width={100}
//           radius={5}
//           color="#1F2937"
//           ariaLabel="ball-triangle-loading"
//           wrapperClass={{}}
//           wrapperStyle=""
//           visible={true}
//         />
//       </div>
//     );
//   }

//   return (
//     <nav className="bg-slate-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-5">
//       <div className="flex items-center justify-between px-4 py-3 sm:p-0">
//         <div className="inline-flex gap-5">
//           <Link to="/">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzuQTrGWG_fzYmpGIOSVQq2mBKvaJ1UGWkEvLjqxJbP83Ngy07XXztApM-uWVXr6kX34&usqp=CAU"
//               alt="Logo"
//               className="h-16 w-16 rounded-full border-white  ml-2"
//             />
//           </Link>
//           <Link
//             to="/"
//             className="text-white my-auto md:text-2xl sm:text-sm   font-bold">
//             Sport Zone Academy
//           </Link>
//           <label className="label cursor-pointer">
//             <span className="label-text text-white mx-3">Theme</span>
//             <input type="checkbox" className="toggle" onChange={toggleTheme} />
//           </label>
//         </div>
//         <div className="sm:hidden">
//           <button
//             type="button"
//             className="text-gray-500  hover:bg-sky-400 hover:text-slate-900  focus:outline-none text-2xl focus:text-white"
//             aria-label="toggle menu"
//             onClick={toggleMenu}>
//             <FaBars />
//           </button>
//         </div>
//       </div>
//       <nav
//         className={`${
//           isOpen ? "block" : "hidden"
//         } sm:flex sm:items-center sm:w-auto`}>
//         <div className="px-2 pt-2 text-white text-lg font-semibold pb-2 sm:flex">
//           <NavLink
//             to="/"
//             exact="true"
//             className="block px-2 py-1  rounded  hover:bg-sky-400 hover:text-slate-900  hover:rounded-lg sm:mt-0 sm:ml-2">
//             Home
//           </NavLink>

//           <NavLink
//             to="/instructors"
//             exact="true"
//             className="block px-2 py-1  hover:bg-sky-400 hover:text-slate-900  hover:rounded-lg sm:mt-0 sm:ml-2">
//             Instructors
//           </NavLink>
//           <NavLink
//             to="/classes"
//             exact="true"
//             className="block px-2 py-1  hover:bg-sky-400 hover:text-slate-900 hover:rounded-lg sm:mt-0 sm:ml-2">
//             Classes
//           </NavLink>
//           <NavLink
//             to="/dashboard"
//             exact="true"
//             className="block px-2 md:py-1  hover:bg-sky-400 hover:text-slate-900 hover:rounded-lg sm:mt-0 ">
//             Dashboard
//           </NavLink>
//         </div>
//       </nav>
//       <nav
//         className={`${
//           isOpen ? "block" : "hidden"
//         } sm:flex sm:items-center sm:w-auto`}>
//         <div className="px-2 md:pt-2 text-white text-lg font-semibold pb-2 sm:flex">
//           <div>
//             {user && user.photoURL ? (
//               <img
//                 src={user.photoURL}
//                 alt="Profile"
//                 className="h-12 w-15 rounded-full border-white border-2 ml-2"
//                 title={user.displayName || ""}
//               />
//             ) : (
//               <></>
//             )}
//           </div>
//           {user ? (
//             <p>
//               <button
//                 onClick={handleLogOut}
//                 className="block px-2 py-1  hover:bg-sky-400 hover:text-slate-900 hover:rounded-lg sm:mt-0 sm:ml-2">
//                 Logout
//               </button>
//             </p>
//           ) : (
//             <NavLink
//               to="/login"
//               exact="true"
//               className="block px-2 py-1  hover:bg-sky-400 hover:text-slate-900 hover:rounded-lg sm:mt-0 sm:ml-2">
//               Login
//             </NavLink>
//           )}
//         </div>
//       </nav>
//     </nav>
//   );
// };

// export default NavBar;
