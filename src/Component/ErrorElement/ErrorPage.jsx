import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/error.json";

const ErrorPage = () => {
  const { error } = useRouteError();

  return (
    <div className="md:flex gap-10 justify-evenly h-screen ">
      <div className=" rounded-lg p-8">
        <Lottie style={{ height: "80vh" }} animationData={errorAnimation} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-red-700 mb-2">
          {status || "404"} Error
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          {error?.message || "Oops! Something went wrong."}
        </p>
        <Link to="/" className="btn-sky">
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
