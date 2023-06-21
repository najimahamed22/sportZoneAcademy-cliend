import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MySelectedClasses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: selectedClassesData = [], refetch } = useQuery(
    ["selected-classes", user?.email],
    async () => {
      const res = await axiosSecure.get(`/selected-classes/${user?.email}`);
      return res.data;
    }
  );

  const handleDelete = async (classId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/selected-classes/${classId}`);
          // Manually trigger a refetch to update the data
          refetch();
          Swal.fire("Deleted!", "Your class has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting class:", error);
          Swal.fire(
            "Error!",
            "An error occurred while deleting the class.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>SZA | MySelectedClasses</title>
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
              <th className="py-2 px-4  border">Available Seats</th>
              <th className="py-2 px-4  border">Action</th>
              <th className="py-2 px-4  border">Payment</th>
            </tr>
          </thead>
          <tbody>
            {selectedClassesData
              .filter((classData) => !classData.enrolled) // Filter out classes with enrolled: true
              .map((classData, index) => (
                <tr key={classData._id} className="border">
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
                  <td className="py-2 px-4">{classData.availableSeats}</td>
                  <td className="py-2 px-4 border">
                    <button
                      className="px-4 py-2 mt-4 text-black font-bold bg-red-400 hover:bg-red-600 rounded-md focus:outline-none inline-flex gap-3"
                      onClick={() => handleDelete(classData._id)}>
                      <RiDeleteBinLine
                        className="mt-1 text-teal-950"
                        size={20}
                      />
                      Delete
                    </button>
                  </td>
                  <td className="py-2 px-4 border">
                    <Link to={`/dashboard/payment/${classData._id}`}>
                      <button className="btn-gray">Pay</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClasses;
