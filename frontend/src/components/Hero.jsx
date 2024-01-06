import React from 'react';
//import  useTypingEffect from "../hooks/typing-effect";

//const text = useTypingEffect("To Do App",500);
const Hero = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-12 md:py-24">
          <div className="w-full md:w-1/2 lg:w-1/2">
            <h1 className="text-5xl font-bold leading-tight text-gray-800 mb-6">Data to enrich your online business</h1>
            <p className="text-gray-600 text-lg mb-8">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
              Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get started
              </button>
              <button className="text-blue-600 hover:text-blue-700 font-semibold py-2 px-4 rounded border border-blue-600 hover:border-blue-700">
                Learn more
              </button>
            </div>
          </div>
          {/* <div className="w-full md:w-1/2 lg:w-1/2 mt-8 md:mt-0">
            {text}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
