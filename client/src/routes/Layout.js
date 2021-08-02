import React from "react";

function Layout() {
  return (
    <div class='rounded-lg shadow bg-base-200 drawer drawer-mobile h-52'>
      <input id='my-drawer-2' type='checkbox' class='drawer-toggle'></input>
      <div class='flex flex-col items-center justify-center drawer-content'>
        <label
          for='my-drawer-2'
          class='mb-4 btn btn-primary drawer-button lg:hidden'
        >
          open menu
        </label>
        <div class='hidden text-xs text-center lg:block'>
          Menu is always open on desktop size.
        </div>
        <div class='text-xs text-center lg:hidden' data-theme='retro'>
          Menu can be toggled on mobile size.
        </div>
      </div>
      <div class='drawer-side'>
        <label for='my-drawer-2' class='drawer-overlay'></label>
        <ul class='menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content'>
          <li>
            <a>Menu Item</a>
          </li>
          <li>
            <a>Menu Item</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Layout;
