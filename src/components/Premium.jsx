import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handlePurchase = async (packageType) => {
    try {
      const res = await axios.post(
        BASE_URL + "/payment/checkout",
        { plan: packageType },
        { withCredentials: true }
      );
      if (res.data.success && res.data.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("Payment Failure!");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upgrade to Premium</h1>
          <p className="text-lg opacity-70">
            Get more matches, better visibility, and exclusive features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Silver Package */}
          <div className="card bg-base-300 shadow-2xl border-2 border-gray-600 hover:scale-105 transition-transform">
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="badge badge-lg badge-neutral mb-2">SILVER</div>
                <h2 className="card-title text-3xl justify-center mb-2">
                  9.99
                  <span className="text-lg font-normal opacity-60">/month</span>
                </h2>
              </div>

              <div className="divider"></div>

              {/* Silver Perks */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span>Unlimited swipes per day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>See who liked you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>5 Super Likes per day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Rewind last swipe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Ad-free experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Priority support</span>
                </li>
              </ul>

              <div className="card-actions justify-center">
                <button
                  className="btn btn-neutral btn-wide"
                  onClick={() => handlePurchase("Silver")}
                >
                  Buy Silver
                </button>
              </div>
            </div>
          </div>

          {/* Gold Package */}
          <div className="card bg-gradient-to-br from-yellow-600 to-yellow-800 shadow-2xl border-2 border-yellow-500 hover:scale-105 transition-transform relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="badge badge-warning badge-lg">MOST POPULAR</div>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="badge badge-lg bg-yellow-400 text-black mb-2">
                  GOLD
                </div>
                <h2 className="card-title text-3xl justify-center mb-2 text-white">
                  $19.99
                  <span className="text-lg font-normal opacity-80">/month</span>
                </h2>
              </div>

              <div className="divider divider-warning"></div>

              {/* Gold Perks */}
              <ul className="space-y-3 mb-6 text-white">
                <li className="flex items-start gap-2">
                  <span className="font-semibold">
                    All Silver features included
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Unlimited Super Likes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Profile boost (2x per month)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Advanced filters by skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Message read receipts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Priority matching algorithm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Exclusive Gold badge on profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>VIP customer support</span>
                </li>
              </ul>

              <div className="card-actions justify-center">
                <button
                  className="btn btn-warning btn-wide text-black font-bold"
                  onClick={() => handlePurchase("Gold")}
                >
                  Buy Gold
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 opacity-70">
          <p className="text-sm">
            All plans auto-renew. Cancel anytime from your profile settings.
          </p>
          <p className="text-sm mt-2">
            Secure payment processing. Your data is safe with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Premium;
