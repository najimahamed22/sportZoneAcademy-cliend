import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";
import { BallTriangle } from "react-loader-spinner";
import { useEffect } from "react";

const AllInstructor = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allInstructors = [],
    refetch,
    isLoading,
  } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/allInstructor");
    return res.data;
  });
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <AnimatePresence>
      {isLoading ? (
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
        <div>
          <h1 className="text-4xl text-center font-bold my-8">
            Our Top Instructors
          </h1>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
            {allInstructors.map((instructor, index) => (
              <motion.div
                key={instructor._id}
                className="bg-white flex gap-5 rounded-lg shadow-md p-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 2.5, delay: index * 0.5 }} // Add delay here
              >
                <div className="flex mx-auto items-center justify-between mb-4">
                  <img
                    src={instructor.photoUrl}
                    alt={instructor.instructorName}
                    className="w-full  h-52 object-cover"
                  />
                </div>
                <div className="space-y-5">
                  <h3 className="text-xl font-semibold">
                    {instructor.instructorName}
                  </h3>
                  <p className="text-gray-500">{instructor.instructorEmail}</p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Seat Bookings:</span>{" "}
                    {instructor.seatBookings}
                  </p>
                  <div className="flex space-x-2">
                    <FaFacebook className="text-gray-500 hover:text-blue-500" />
                    <FaTwitter className="text-gray-500 hover:text-blue-500" />
                    <FaEnvelope className="text-gray-500 hover:text-blue-500" />
                  </div>
                </div>
                <div className="mt-4"></div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AllInstructor;
