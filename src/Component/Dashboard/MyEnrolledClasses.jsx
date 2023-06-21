import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";

const MyEnrolledClasses = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: selectedClassesData = [] } = useQuery(
    ["selected-classes", user?.email],
    async () => {
      const res = await axiosSecure.get(`/selected-classes/${user?.email}`);
      return res.data;
    }
  );
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
    <div className="container mx-auto p-4">
      <Helmet>
        <title>SZA | MyEnrolledClasses</title>
      </Helmet>
      <h1 className="text-4xl text-center font-bold mb-4">My class list</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4  border">#</th>
              <th className="py-2 px-4  border">Class Image</th>
              <th className="py-2 px-4  border">Class Name</th>
              <th className="py-2 px-4  border">Instructor</th>
              <th className="py-2 px-4  border">Price</th>
              <th className="py-2 px-4  border">Payment Type</th>
            </tr>
          </thead>
          <tbody>
            {selectedClassesData
              .filter((classData) => classData.enrolled) // Filter out classes with enrolled: true
              .map((classData, index) => (
                <tr key={classData._id} className="border text-center">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    <img
                      src={classData.classImage}
                      alt={classData.className}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border">{classData.className}</td>
                  <td className="py-2 px-4 border">
                    {classData.instructorName}
                  </td>
                  <td className="py-2 px-4 border">${classData.price}</td>
                  <td className="py-2 px-4 border">Successfully</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrolledClasses;
