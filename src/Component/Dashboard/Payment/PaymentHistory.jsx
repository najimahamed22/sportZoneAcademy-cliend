import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: paymentHistoryItems = [] } = useQuery(
    ["payments", user?.email],
    async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
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
    <div>
      <Helmet>
        <title>SZA | PaymentHistory</title>
      </Helmet>
      <h1 className="text-4xl text-center font-bold my-5">Payment History</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="py-2 px-4  border">#</th>
            <th className="px-4 py-2 border">Class Image</th>
            <th className="px-4 py-2 border">Class Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Transaction ID</th>
            <th className="px-4 py-2 border">Time</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistoryItems.map((item, index) => (
            <tr key={item._id}>
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="px-4 py-2 border">
                <img
                  src={item.classImage}
                  alt={item.className}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-4 py-2 border">{item.className}</td>
              <td className="px-4 py-2 border">${item.price}</td>
              <td className="px-4 py-2 border">{item.transactionId}</td>
              <td className="px-4 py-2 border">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
