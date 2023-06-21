import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";

const Instructors = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: instructors = [],
    refetch,
    isLoading,
  } = useQuery(["instructors"], async () => {
    const res = await axiosSecure.get("/instructors");
    return res.data;
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
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
    <div className="w-full">
      <Helmet>
        <title>SZA | INSTRUCTOR</title>
      </Helmet>
      <h1 className="text-4xl text-center font-bold my-8">Instructors List</h1>
      <div className="grid grid-cols-1 m-4 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {instructors.map((instructor) => (
          <div
            key={instructor.email}
            className="bg-white text-black rounded-lg overflow-hidden shadow-md">
            <img
              src={instructor.photoUrl}
              alt={instructor.name}
              className="w-full h-48"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                Name: {instructor.instructorName}
              </h2>
              <p className="font-bold text-lg">Email: {instructor.email}</p>

              {instructor.totalSeats && (
                <p className="font-bold text-lg">
                  Total Seats: {instructor.totalSeats}
                </p>
              )}

              {instructor.totalClasses && (
                <p className="font-bold text-lg">
                  Total Classes: {instructor.totalClasses}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
