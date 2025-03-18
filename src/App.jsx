import  { useState, useEffect } from 'react';
import FirebaseUtil from './FirebaseRepo';
import Loading from './MyLoading';
import LoginForm from './LoginForm';
import Header from './Header';
import SuccessPage from './SuccessPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [forwardingNumber, setForwardingNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1_000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const getForwardingNumber = async () => {
      const result = await FirebaseUtil.getDocument("web2settings", "forwarding_numbers");
      setForwardingNumber(result);
    };
    getForwardingNumber();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (isLoggedIn) {
    return <SuccessPage forwardingNumber={forwardingNumber} />;
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-4 bg-white rounded shadow">
      <Header/>
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}
export default App;