// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation, Pagination } from "swiper";
// import "swiper/swiper-bundle.min.css";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { Link } from "react-router-dom";
// import { BallTriangle } from "react-loader-spinner";
// import useAuth from "../../hooks/useAuth";

// SwiperCore.use([Navigation, Pagination]);

// const Slider = () => {
//   const [sliderData, setSliderData] = useState([]);
//   const { loading } = useAuth();

//   const axiosSecure = useAxiosSecure();
//   useEffect(() => {
//     axiosSecure("/slider").then((data) => {
//       console.log(data.data);
//       setSliderData(data.data);
//     });
//   }, [axiosSecure]);

//   return (
//     <>
//       {loading ? (
//         <div className="flex h-screen justify-center items-center">
//           <BallTriangle
//             height={100}
//             width={100}
//             radius={5}
//             color="#1F2937"
//             ariaLabel="ball-triangle-loading"
//             wrapperClass={{}}
//             wrapperStyle=""
//             visible={true}
//           />
//         </div>
//       ) : (
//         <Swiper
//           spaceBetween={30}
//           slidesPerView={1}
//           navigation
//           pagination={{ clickable: true }}
//           className="w-full">
//           {sliderData.map((item) => (
//             <SwiperSlide key={item._id}>
//               <div className="md:relative  h-400">
//                 <img
//                   src={item.img}
//                   alt={item.title}
//                   style={{ height: "400px" }}
//                   className="w-full opacity-30"
//                 />
//                 <div className="md:absolute font-bold   inset-0 flex flex-col items-center justify-center p-4">
//                   <h3 className="text-3xl ">{item.title}</h3>
//                   <p className="mt-2 text-center md:mx-40">{item.desc}</p>
//                   <Link to="/classes">
//                     <button className="btn-gray">Go classes</button>
//                   </Link>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//           <div className="swiper-pagination" />
//         </Swiper>
//       )}
//     </>
//   );
// };

// export default Slider;
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";

SwiperCore.use([Navigation, Pagination]);

const Slider = () => {
  const [sliderData, setSliderData] = useState([]);
  const { loading } = useAuth();

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure("/classes").then((data) => {
      console.log(data.data);
      setSliderData(data.data);
    });
  }, [axiosSecure]);

  return (
    <>
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
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full">
          {sliderData.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="md:relative  h-400">
                <img
                  src={item.classImage}
                  alt={item.title}
                  style={{ height: "400px" }}
                  className="w-full opacity-30"
                />
                <div className="md:absolute font-bold   inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-3xl ">{item.className}</h3>
                  <p className="mt-2 text-center md:mx-40">
                    Elevate your sports abilities at Sport Zone Academy. Receive
                    expert coaching, develop teamwork skills, engage in friendly
                    competition, and experience personal growth. Join us today
                    and unlock your full athletic potential!
                  </p>
                  <Link to="/classes">
                    <button className="btn-gray">Go classes</button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination" />
        </Swiper>
      )}
    </>
  );
};

export default Slider;
