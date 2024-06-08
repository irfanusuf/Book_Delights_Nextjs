'use client'

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/clientComponents/CheckoutForm";
import "./app.css"

const stripePromise = loadStripe("pk_test_51POyEoD61yegK70G1cIBWLUdiLDTocDmcj2tqGPrrDEQpgeutRc6tkV3EqvHx1zm5HSIAA2LBKhlCJwCGtKrV2rI006Z5gyM0j");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
  
    fetch("/api/stripe/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="app">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}