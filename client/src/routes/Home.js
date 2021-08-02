import React from "react";
import Stat from "../components/Stat";
import baby from "../images/baby.jpg";
import Age from "../components/Age";

export default function Home() {
  return (
    <div>
      <div className='my-2'>
        <section class='bg-gradient  dark:bg-gray-800 py-8 md:py-8'>
          <div class='max-w-5xl mx-auto px-5 box-content'>
            <div class='flex flex-col md:flex-row -mx-5'>
              <div class='w-full px-5 mb-5 md:mb-0 text-center md:text-left'>
                <div className='flex justify-items-start'>
                  <img
                    src={baby}
                    alt=''
                    class='mask mask-squircle mb-8 justify-items-start w-80%'
                  />
                </div>
              </div>
              <div class='w-full md:w-auto px-5'>
                <Age />
                <div class='text-grey-700 sm:text-center md:text-left mt-5'>
                  <h3 class='font-bold font-heading md:text-3xl text-gray-800'>
                    Arika Pongsrihadulchai
                  </h3>
                  <h3 class='font-bold font-heading text-4xl text-md text-gray-400'>
                    October 24 2020
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Stat />
    </div>
  );
}
