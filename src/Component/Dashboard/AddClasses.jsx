import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddClasses = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const classData = {
      className: data.className,
      classImage: data.classImage,
      instructorName: user.displayName,
      instructorEmail: user.email,
      photoUrl: user.photoURL,
      availableSeats: parseInt(data.availableSeats),
      price: parseFloat(data.price),
      totalSeats: parseInt(data.availableSeats),
      status: "pending",
    };

    fetch("https://sport-zone-academy-server.vercel.app/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(classData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Class Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-6">
      <Helmet>
        <title>SZA | AddClasses</title>
      </Helmet>
      <h3 className="text-2xl font-bold mb-4">Class Add</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Class Name
          </label>
          <input
            {...register("className")}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter class name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Class Image
          </label>
          <input
            {...register("classImage")}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter class image URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Instructor Name
          </label>
          <input
            value={user.displayName}
            readOnly
            className="w-full px-4 py-2 border rounded"
            placeholder="Instructor name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Instructor Email
          </label>
          <input
            value={user.email}
            readOnly
            className="w-full px-4 py-2 border rounded"
            placeholder="Instructor email"
          />
        </div>
        <label className="block text-sm font-medium text-gray-700">
          Instructor Photo URL
        </label>
        <input
          value={user.photoURL}
          readOnly
          className="w-full px-4 py-2 border rounded"
          placeholder="Photo URL"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Available Seats
          </label>
          <input
            {...register("availableSeats")}
            type="number"
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter available seats"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            {...register("price")}
            type="number"
            step="0.01"
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter price"
          />
        </div>
        <button type="submit" className="w-full btn-gray">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddClasses;
