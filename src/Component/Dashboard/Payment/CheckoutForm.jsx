import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = ({ price, oneClass }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  console.log(stripe);
  useEffect(() => {
    if (price > 0) {
      fetch(
        "https://sport-zone-academy-server.vercel.app/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
          body: JSON.stringify({ price }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    }
  }, [price, stripe]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setErrorMessage(error.message);
      console.log("[error]", error);
    } else {
      setSuccessMessage("Payment successful!");
    }
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        className: oneClass.className,
        status: "service pending",
        instructorName: oneClass.instructorName,
        instructorEmail: oneClass.instructorEmail,
        classImage: oneClass.classImage,
        classId: oneClass._id,
        selectedId: oneClass.selectedId,
      };
      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertResult.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Payment Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      {errorMessage && (
        <p className="text-red-500 text-2xl text-center font-semibold my-6">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="text-green-500 text-2xl text-center font-semibold mt-6">
          {successMessage}
        </p>
      )}
      {transactionId && (
        <p className="text-green-500 my-4 text-center">
          transactionId: {transactionId}
        </p>
      )}

      <CardElement
        className="font-bold border border-gray-300 p-2 rounded-lg mb-4"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#001F3F",
              "::placeholder": {
                color: "#001F3F",
              },
            },
            invalid: {
              color: "#EF4444",
            },
          },
        }}
      />

      <button
        className="btn-gray w-full disabled:bg-gray-400"
        type="submit"
        disabled={!stripe || !clientSecret || processing}>
        {/* || processing Pay */}
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
