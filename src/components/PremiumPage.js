import React from 'react';
import axios from 'axios';

export default function PremiumPage() {
  const handlePayment = async (amount) => {
    const { data: { key } } = await axios.get("http://localhost:5000/api/get-razorpay-key");

    const { data: { order } } = await axios.post("http://localhost:5000/api/create-order", {
      amount: amount * 100,
    });

    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "NewsZap",
      description: "Subscription Payment",
      order_id: order.id,
      handler: async (response) => {
        const paymentData = {
          orderCreationId: order.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        await axios.post("http://localhost:5000/api/save-payment-details", paymentData);

        alert("Payment Successful!");
      },
      prefill: {
        name: "NewsZap",
        email: "newszap@gmailcom",
        contact: "9999999999",
      },
      notes: {
        address: "NewsZap Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <section>
        <h1>Memberships</h1>
        <div className="cards">
          <div className="card card--purple">
            <div className="card__outer">
              <div className="card__inner">
                <span className="icon">
                  {/* SVG Icon */}
                </span>
                <p className="title">Starter Pack</p>
                <p className="price"><span className="price price--number"><span className="price price--dolar">₹</span>129</span></p>
                <ul>
                  <li>Access to breaking news and top stories</li>
                  <li>Basic email updates</li>
                  <li>Basic customer support</li>
                </ul>
              </div>
              <a href='#!' onClick={() => handlePayment(129)}>Get Started Now</a>
            </div>
          </div>
          <div className="card card--red active">
            <div className="card__outer">
              <div className="card__inner">
                <span className="icon">
                  {/* SVG Icon */}
                </span>
                <p className="title">Enterprise Pack</p>
                <p className="price"><span className="price price--number"><span className="price price--dolar">₹</span>249</span></p>
                <ul>
                  <li>Unlimited access to breaking news and top stories</li>
                  <li>Full access to premium articles</li>
                  <li>Advanced email updates</li>
                  <li>Priority customer support</li>
                </ul>
              </div>
              <a href='#!' onClick={() => handlePayment(249)}>Get Started Now</a>
            </div>
          </div>
          <div className="card card--green">
            <div className="card__outer">
              <div className="card__inner">
                <span className="icon">
                  {/* SVG Icon */}
                </span>
                <p className="title">Premium Pack</p>
                <p className="price"><span className="price price--number"><span className="price price--dolar">₹</span>389</span></p>
                <ul>
                  <li>Full access to premium articles</li>
                  <li>Priority customer support</li>
                  <li>Customized content recommendations</li>
                  <li>Exclusive access to premium features</li>
                </ul>
              </div>
              <a href='#!' onClick={() => handlePayment(389)}>Get Started Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
