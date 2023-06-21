import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { AiOutlineUser, AiOutlineDollar } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { BallTriangle } from "react-loader-spinner";

const TopClasses = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: topClasses = [],
    refetch,
    isLoading,
  } = useQuery(["top-classes"], async () => {
    const res = await axiosSecure.get("/top-classes");
    return res.data;
  });
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
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
            Our Top Classes
          </h1>
          <div className="grid grid-cols-1 font-medium md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topClasses.map((classItem) => (
              <div
                key={classItem._id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                <img
                  src={classItem.classImage}
                  alt={classItem.className}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Class Name: {classItem.className}
                </h2>
                <div className="flex text-lg font-medium items-center text-gray-700 mb-4">
                  <AiOutlineUser className="mr-2" />
                  <p>Instructor Name: {classItem.instructorName}</p>
                </div>
                <div className="flex items-center text-gray-700 mb-4">
                  <AiOutlineDollar className="mr-2" />
                  <p>Price: {classItem.price}</p>
                </div>
                <div className="flex items-center text-gray-700 mb-4">
                  <FaCalendarAlt className="mr-2" />
                  <p>
                    {classItem.availableSeats}/{classItem.totalSeats} seats
                    available
                  </p>
                </div>
                <div className="flex items-center text-gray-700">
                  <HiOutlineUsers className="mr-2" />
                  <p>{classItem.seatBookings} bookings</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopClasses;
