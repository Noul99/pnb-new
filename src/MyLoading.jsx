/* eslint-disable no-undef */

import myImage from './assets/top1.jpg';
const Loading = () => {
  // var texts = ["hello1" , "hello2" , "hello3"]
  // return (
  //   <div className="h-screen flex flex-col my-11 items-center justify-around">
  //     {texts.map((text, index) => (
  //       <span key={index} className="text-lg font-medium">
  //         {text}
  //       </span>
  //     ))}
  //   </div>
  // );
  return (
    <div className="h-screen bg-blue-500 flex flex-col  items-center justify-around">
      <img className="w-3/5 mt-10 mx-auto" src={myImage} alt="Description of the image" />
      <div className="text-center mt-4">
        <svg
          className="animate-spin h-16 w-16 text-white mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-white text-xl font-semibold tracking-wide mb-4">
          Please wait, loading...
        </p>
      </div>
      <div className="text-center mb-4">
        <p className="text-white text-lg font-normal tracking-wide">
          We understand your world
        </p>
      </div>
    </div>
  );
};

export default Loading;