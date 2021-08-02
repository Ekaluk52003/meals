import React from "react";

export default function Record() {
  return (
    <div className='px-4 py-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 '>
      <div class='max-w-2xl overflow-hidden'>
        <div class='px-4 py-5 sm:px-6'>
          <h3 class='text-lg leading-6 font-medium text-gray-900'>
            User database
          </h3>
          <p class='mt-1 max-w-2xl text-sm text-gray-500'>
            Details and informations about user.
          </p>
        </div>
        <div class='border-gray-200'>
          <dl>
            <div class='px-4 py-5 border-b-2'>
              <dt class='text-sm font-medium text-gray-500'>Full name</dt>
              <dd class='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                Mickael Poulaz
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
