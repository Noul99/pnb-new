import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './MyLoading';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
        </Routes>
      )}
    </Router>
  );
}

export default App;