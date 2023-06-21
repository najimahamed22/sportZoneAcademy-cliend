import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
// import useAuth from "../../hooks/useAuth";

const ManageUsers = () => {
  //   const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleMakeAdmin = (user) => {
    console.log(user);
    fetch(
      `https://sport-zone-academy-server.vercel.app/users/admin/${user._id}`,
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
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1000,
            icon: "success",
          });
          refetch();
        }
      });
  };
  const handleMakeInstructor = (user) => {
    fetch(
      `https://sport-zone-academy-server.vercel.app/users/instructor/${user._id}`,
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
            title: `${user.name} is now an Instructor!`,
            showConfirmButton: false,
            timer: 1000,
            icon: "success",
          });
          refetch();
        }
      });
  };

  return (
    <div className="container">
      <Helmet>
        <title>SZA | ManageUsers</title>
      </Helmet>
      <div className="overflow-x-auto">
        <h1 className="text-4xl text-center font-bold mb-4">Users List</h1>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b">#</th>
              <th className="py-2 px-4 bg-gray-100 border-b">User Photo</th>

              <th className="py-2 px-4 bg-gray-100 border-b">Name</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Email</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Role</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{index + 1}</td>

                <td className="py-2 px-4 border-b">
                  <img
                    src={user.photoURl}
                    alt={user.photoURl}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="btn"
                    onClick={() => handleMakeAdmin(user)}
                    disabled={user.role === "admin"}>
                    Make Admin
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="btn"
                    onClick={() => handleMakeInstructor(user)}
                    disabled={user.role === "instructor"}>
                    Make Instructor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
