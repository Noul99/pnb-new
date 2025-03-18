import '../src/App.css';

const Loading = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0066b3]">
      {/* Header with Canara Bank Logo */}
      <div className="pt-10 px-6 text-center">
        <div className="text-white mx-auto">
          <h1 className="text-4xl font-serif mb-1">Canara Bank</h1>
          <p className="text-sm mb-2">A Government of India Undertaking</p>
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 text-xs mt-1 rounded inline-block">
            Fintech Syndicate
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="text-white text-center mt-2">
        <p>Together We Can</p>
      </div>

      {/* Loading Animation */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-yellow-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-r-transparent border-b-yellow-400 border-l-transparent rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        </div>
        
        <div className="bg-[#0077be] text-white rounded-3xl w-full max-w-xs p-4 text-center">
          <h2 className="text-xl mb-1">Welcome To</h2>
          <h1 className="text-3xl font-bold text-yellow-300 mb-4">Net Banking</h1>
          <p className="text-white text-sm">Please wait while we secure your connection...</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
        <p className="text-sm"> 2025 Canara Bank. All rights reserved.</p>
        <p className="text-xs">For support, call 1800-123-4567 or email support@canarabank.com</p>
      </footer>
    </div>
  );
};

export default Loading;