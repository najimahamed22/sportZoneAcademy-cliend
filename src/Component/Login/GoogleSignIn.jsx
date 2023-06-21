import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const GoogleSignIn = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn().then((res) => {
      console.log(res.user);
      const users = {
        name: res.user.displayName,
        email: res.user.email,
        photoURl: res.user.photoURL,
        role: "student",
      };
      console.log(users);
      fetch("https://sport-zone-academy-server.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(users),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-start",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      navigate(from, { replace: true });
    });
  };

  return (
    <button
      className="flex items-center btn-sky font-bold justify-center w-full  "
      onClick={handleGoogleSignIn}>
      <FaGoogle className="mr-2" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
