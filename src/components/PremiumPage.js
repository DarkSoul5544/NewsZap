import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PremiumPage() {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Fetch user profile data to check if the user is premium
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
        setIsPremium(response.data.is_premium);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handlePayment = async (amount, plan) => {
    try {
      const { data: { key } } = await axios.get('http://localhost:5000/api/get-razorpay-key');

      const { data: { order } } = await axios.post('http://localhost:5000/api/create-order', {
        amount: amount * 100,
      });

      const options = {
        key: key,
        amount: order.amount,
        currency: 'INR',
        name: 'NewsZap',
        description: 'Subscription Payment',
        order_id: order.id,
        handler: async (response) => {
          const paymentData = {
            orderCreationId: order.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          await axios.post('http://localhost:5000/api/save-payment-details', { ...paymentData, plan });

          // Update user profile to reflect premium status
          setIsPremium(true);

          alert('Payment Successful!');
        },
        prefill: {
          name: 'NewsZap',
          email: 'newszap@gmail.com',
          contact: '9999999999',
        },
        notes: {
          address: 'NewsZap Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  if (isPremium && user) {
    const expiryDate = new Date(user.premiumExpiry);
    const currentDate = new Date();
    const remainingDays = Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24));

    if (remainingDays <= 0) {
      // Update database to set user as non-premium if the plan has expired
      axios.put('http://localhost:5000/api/update-premium-status', { is_premium: false }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then(() => {
        setIsPremium(false);
      }).catch((error) => {
        console.error('Error updating premium status:', error);
      });

      return <div>Your premium plan has expired. Please renew.</div>;
    }

  return (
      <div className="premium-container">
         <h1>Premium Details</h1>
        <div className="profile-info">
          <img src={user.image} alt="Profile" className="profile-img" />
          <div className="profile-details">
            <p>Name: {user.name}</p>
            <p>Plan: {user.plan}</p>
            <p>Days remaining: {remainingDays} days</p>
          </div>
        </div>
      </div>
    );
  }

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
              <a href='#!' onClick={() => handlePayment(129, 'Starter Pack')}>Get Started Now</a>
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
              <a href='#!' onClick={() => handlePayment(249, 'Enterprise Pack')}>Get Started Now</a>
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
              <a href='#!' onClick={() => handlePayment(389, 'Premium Pack')}>Get Started Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
