import React from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-12 md:py-24">
          <div className="w-full md:w-1/2 lg:w-1/2">
            <h1 className="text-5xl font-bold leading-tight text-gray-800 mb-6">Keep Notes So that you wont Forget.</h1>
            <p className="text-gray-600 text-lg mb-8">
              From many ages ago mankind has been very busy doing their work they seem to forget something that they need to do.
              This App is to make sure that doesnt happen and they have time to do everything and remember to do everything.
            </p>
            <div className="flex flex-wrap gap-4">
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
  Get started
</Link>
            </div>
          </div>
          {/* <div className="w-full md:w-1/2 lg:w-1/2 mt-8 md:mt-0">
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
