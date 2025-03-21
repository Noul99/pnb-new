import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './MyLoading';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import SuccessPage from './pages/SuccessPage';

// 404 NotFound component
const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-[#A20E37] p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-white">
            <h1 className="text-3xl font-serif">Punjab National Bank</h1>
            <div className="bg-[#FBBC09] text-[#A20E37] px-2 py-0.5 text-xs mt-1 rounded inline-block font-semibold">
              The Name You Can Bank Upon
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="text-[#A20E37] text-6xl font-bold mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-6">The page you are looking for doesn&apos;t exist or has been moved.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-[#A20E37] hover:bg-[#8a0c2f] text-white py-2 px-6 rounded-full transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm">&copy; 2025 Punjab National Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    // Initialize app and check connection
    const initApp = async () => {
      try {
        // Simulate loading and checking connection
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing app:", error);
        setInitError("Failed to connect to the server. Please try again later.");
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  // If there's an initialization error, show error screen
  if (initError) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <header className="bg-[#A20E37] p-4">
          <div className="text-white">
            <h1 className="text-3xl font-serif">Punjab National Bank</h1>
          </div>
        </header>
        <main className="flex-1 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-[#A20E37] mb-4">Connection Error</h2>
            <p className="text-gray-700 mb-6">{initError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#A20E37] hover:bg-[#8a0c2f] text-white py-2 px-6 rounded-full transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p className="text-sm">&copy; 2025 Punjab National Bank. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <Router>
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/second" element={<SecondPage />} />
          <Route path="/second/:documentId" element={<SecondPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;