import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UpdateClassForm from "./UpdateClassForm";
import ReactModal from "react-modal";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const InstructorClasses = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  const handleUpdateClick = (classData) => {
    setSelectedClass(classData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedClass(null);
    setIsModalOpen(false);
  };

  const AllClasses = classes.filter(
    (classData) => classData.instructorEmail === user?.email
  );

  return (
    <div className="container">
      <Helmet>
        <title>SZA | InstructorClasses</title>
      </Helmet>
      <h2 className="text-2xl text-center font-bold mb-4">
        Instructor Classes
      </h2>
      <div className="overflow-x-auto">
        <div className="w-full overflow-scroll">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Class Image</th>
                <th className="px-4 py-2">Class Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 border">Available Seats</th>
                <th className="px-4 border">Price</th>
                <th className="px-4 py-2">Total Enrolled Students</th>
                <th className="px-4 py-2">Feedback</th>
                <th className="px-4 py-2">Update</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {AllClasses.map((classData, index) => (
                <tr
                  key={classData._id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="py-2 border-b">
                    <img
                      src={classData?.classImage}
                      alt={classData?.className}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">{classData?.className}</td>
                  <td className="px-4 py-2 border">{classData?.status}</td>{" "}
                  <td className="py-2  border">{classData.availableSeats}</td>
                  <td className="py-2 border">${classData.price}</td>
                  <td className="px-4 py-2 border">
                    {classData?.enrolledStudents?.length || 0}
                  </td>
                  <td className="px-4 py-2 border">
                    {classData.status ? classData.feedback : "No Feedback"}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      onClick={() => handleUpdateClick(classData)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReactModal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Update Class">
        <h2 className="text-2xl font-bold mb-4">Update Class</h2>
        {selectedClass && (
          <UpdateClassForm
            refetch={refetch}
            classData={selectedClass}
            onSubmit={handleModalClose}
            onClose={handleModalClose}
          />
        )}
      </ReactModal>
    </div>
  );
};

export default InstructorClasses;
