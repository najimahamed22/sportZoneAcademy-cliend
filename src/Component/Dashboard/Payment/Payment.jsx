import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const oneClass = useLoaderData();

  const { price } = oneClass;
  console.log(price);

  return (
    <div className="bg-sky-400 w-2/3 rounded-md p-20 mx-auto">
      <Helmet>
        <title>SZA | Payment</title>
      </Helmet>
      <h3 className="text-4xl text-center font-bold mb-8">Payment From</h3>
      <Elements stripe={stripePromise}>
        <CheckoutForm oneClass={oneClass} price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
