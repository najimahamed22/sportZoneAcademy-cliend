import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import FeedbackModal from "./FeedbackModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BallTriangle } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const ManageClasses = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleOpenFeedbackModal = (classData) => {
    setSelectedClass(classData);
    setShowFeedbackModal(true);
  };

  const handleApprove = (classData) => {
    fetch(
      `https://sport-zone-academy-server.vercel.app/classes/approve/${classData._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({}),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: `${classData.name} is now approved!`,
            showConfirmButton: false,
            timer: 1000,
            icon: "success",
          });
          refetch();
        }
      });
  };

  const handleDeny = (classData) => {
    fetch(
      `https://sport-zone-academy-server.vercel.app/classes/deny/${classData._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({}),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: `${classData.className} is now denied!`,
            showConfirmButton: false,
            timer: 1000,
            icon: "success",
          });
          refetch();
        }
      });
  };

  const handleSendFeedback = (classData, feedback) => {
    fetch(
      `https://sport-zone-academy-server.vercel.app/classes/feedback/${classData._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({ feedback }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Feedback sent to the instructor!",
            showConfirmButton: false,
            timer: 1000,
            icon: "success",
          });
          refetch();
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed to send feedback",
          text: error.message,
          icon: "error",
        });
      });
  };

  if (loading) {
    // Render a loading state or spinner while the user data is being loaded
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
    <div className="container">
      <Helmet>
        <title>SZA | ManageClasses</title>
      </Helmet>
      <div className="overflow-x-auto">
        <h2 className="text-4xl text-center font-bold mb-4">Manage Classes</h2>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="py-3 border-b">Class Image</th>
                      <th className="py-3 border-b">Class Name</th>
                      <th className="py-3 border-b">Instructor Name</th>
                      <th className="py-3 border-b">Instructor Email</th>
                      <th className="py-3 border-b">Available Seats</th>
                      <th className="py-3 border-b">Price</th>
                      <th className="py-3 border-b">Status</th>
                      <th className="py-3 border-b">Approve</th>
                      <th className="py-3 border-b">Deny</th>
                      <th className="py-3 border-b">Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((classData, index) => (
                      <tr
                        key={classData._id}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}>
                        <td className="py-2 border-b">
                          <img
                            src={classData.classImage}
                            alt={classData.className}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="py-2 text-center border-b">
                          {classData.className}
                        </td>
                        <td className="py-2 text-center border-b">
                          {classData.instructorName}
                        </td>
                        <td className="py-2 text-center border-b">
                          {classData.instructorEmail}
                        </td>
                        <td className="py-2 text-center border-b">
                          {classData.availableSeats}
                        </td>
                        <td className="py-2 text-center border-b">
                          ${classData.price}
                        </td>
                        <td className="py-2 text-center border-b">
                          {classData.status}
                        </td>
                        <td className="py-2 text-center border-b">
                          <button
                            onClick={() => handleApprove(classData)}
                            disabled={classData.status !== "pending"}
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded mr-2">
                            Approve
                          </button>
                        </td>
                        <td className="py-2 text-center border-b">
                          <button
                            onClick={() => handleDeny(classData)}
                            disabled={classData.status !== "pending"}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
                            Deny
                          </button>
                        </td>
                        <td className="py-2 text-center border-b">
                          <button
                            onClick={() => handleOpenFeedbackModal(classData)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded ml-2">
                            Feedback
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {showFeedbackModal && (
          <FeedbackModal
            classData={selectedClass}
            onClose={() => setShowFeedbackModal(false)}
            onSendFeedback={handleSendFeedback}
          />
        )}
      </div>
    </div>
  );
};

export default ManageClasses;
