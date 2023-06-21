import { BallTriangle } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";
import Slider from "./Slider";
import AllInstructor from "./AllInstructor";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
import TopClasses from "./TopClasses";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { loading } = useAuth();
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
    <div>
      <Helmet>
        <title>SZA | Home</title>
      </Helmet>
      <Slider></Slider>
      <AllInstructor></AllInstructor>
      <TopClasses></TopClasses>
      <Testimonials></Testimonials>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
