import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import GoogleSignIn from "./GoogleSignIn";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signIn } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in.",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>SZA | Login</title>
      </Helmet>
      <h2 className="text-4xl text-center mt-10 font-bold mb-4">
        Welcome Back!
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 p-6">
          <div className="flex justify-center mb-6">
            <Lottie style={{ height: "80vh" }} animationData={loginAnimation} />
          </div>
        </div>
        <div className="md:w-1/2 p-6">
          <div>
            <h2 className="text-3xl ms-6 font-bold  mb-4">Login Form</h2>
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <span className="text-red-500">Email is required</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <HiEyeOff className="text-gray-400" size={20} />
                      ) : (
                        <HiEye className="text-gray-400" size={20} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-red-500">Password is required</span>
                  )}
                </div>
                <button type="submit" className="w-full btn-gray">
                  Log In
                </button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-xl ">
                  Do not have an account?
                  <Link
                    to="/register"
                    className="text-sky-400  font-extrabold underline">
                    Register
                  </Link>
                </p>
              </div>
              <GoogleSignIn></GoogleSignIn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
